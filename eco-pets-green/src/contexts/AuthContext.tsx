import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  green_paws_points: number;
  loyalty_tier: string;
  created_at: string;
}

interface PetProfile {
  id: string;
  user_id: string;
  name: string;
  species: string;
  breed: string | null;
  age_years: number | null;
  age_months: number | null;
  photo_url: string | null;
  notes: string | null;
  created_at: string;
}

interface Address {
  id: string;
  user_id: string;
  label: string;
  full_name: string;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string | null;
  is_default: boolean;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  points_earned: number;
  created_at: string;
  items?: OrderItem[];
}

interface OrderItem {
  id: string;
  product_id: number;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  pets: PetProfile[];
  addresses: Address[];
  orders: Order[];
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ error: any }>;
  addPet: (pet: Omit<PetProfile, 'id' | 'user_id' | 'created_at'>) => Promise<{ error: any }>;
  updatePet: (id: string, data: Partial<PetProfile>) => Promise<{ error: any }>;
  deletePet: (id: string) => Promise<{ error: any }>;
  addAddress: (address: Omit<Address, 'id' | 'user_id'>) => Promise<{ error: any }>;
  updateAddress: (id: string, data: Partial<Address>) => Promise<{ error: any }>;
  deleteAddress: (id: string) => Promise<{ error: any }>;
  refreshData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      }

      // Fetch pets
      const { data: petsData } = await supabase
        .from('pet_profiles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (petsData) {
        setPets(petsData);
      }

      // Fetch addresses
      const { data: addressesData } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', userId)
        .order('is_default', { ascending: false });
      
      if (addressesData) {
        setAddresses(addressesData);
      }

      // Fetch orders with items
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (ordersData) {
        setOrders(ordersData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserData(session.user.id);
      } else {
        setProfile(null);
        setPets([]);
        setAddresses([]);
        setOrders([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data.user) {
      // Create user profile
      await supabase.from('user_profiles').insert({
        user_id: data.user.id,
        full_name: fullName,
        green_paws_points: 100, // Welcome bonus
        loyalty_tier: 'Seedling'
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setPets([]);
    setAddresses([]);
    setOrders([]);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return { error: 'Not authenticated' };
    
    const { error } = await supabase
      .from('user_profiles')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('user_id', user.id);
    
    if (!error) {
      setProfile(prev => prev ? { ...prev, ...data } : null);
    }
    return { error };
  };

  const addPet = async (pet: Omit<PetProfile, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return { error: 'Not authenticated' };
    
    const { data, error } = await supabase
      .from('pet_profiles')
      .insert({ ...pet, user_id: user.id })
      .select()
      .single();
    
    if (!error && data) {
      setPets(prev => [data, ...prev]);
    }
    return { error };
  };

  const updatePet = async (id: string, data: Partial<PetProfile>) => {
    const { error } = await supabase
      .from('pet_profiles')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id);
    
    if (!error) {
      setPets(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    }
    return { error };
  };

  const deletePet = async (id: string) => {
    const { error } = await supabase
      .from('pet_profiles')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setPets(prev => prev.filter(p => p.id !== id));
    }
    return { error };
  };

  const addAddress = async (address: Omit<Address, 'id' | 'user_id'>) => {
    if (!user) return { error: 'Not authenticated' };
    
    const { data, error } = await supabase
      .from('user_addresses')
      .insert({ ...address, user_id: user.id })
      .select()
      .single();
    
    if (!error && data) {
      setAddresses(prev => [data, ...prev]);
    }
    return { error };
  };

  const updateAddress = async (id: string, data: Partial<Address>) => {
    const { error } = await supabase
      .from('user_addresses')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id);
    
    if (!error) {
      setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    }
    return { error };
  };

  const deleteAddress = async (id: string) => {
    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setAddresses(prev => prev.filter(a => a.id !== id));
    }
    return { error };
  };

  const refreshData = async () => {
    if (user) {
      await fetchUserData(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      pets,
      addresses,
      orders,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile,
      addPet,
      updatePet,
      deletePet,
      addAddress,
      updateAddress,
      deleteAddress,
      refreshData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
