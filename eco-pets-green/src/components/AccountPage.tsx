import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Leaf, Package, MapPin, Heart, Settings, LogOut, 
  Plus, Edit2, Trash2, X, Check, Crown, Star, ChevronRight,
  Dog, Cat, Bird, Fish, Rabbit
} from 'lucide-react';

interface AccountPageProps {
  onClose: () => void;
}

type TabType = 'overview' | 'pets' | 'orders' | 'addresses' | 'settings';

const AccountPage: React.FC<AccountPageProps> = ({ onClose }) => {
  const { user, profile, pets, addresses, orders, signOut, addPet, updatePet, deletePet, addAddress, deleteAddress, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showAddPet, setShowAddPet] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingPet, setEditingPet] = useState<string | null>(null);

  // Pet form state
  const [petForm, setPetForm] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age_years: 0,
    age_months: 0,
    notes: ''
  });

  // Address form state
  const [addressForm, setAddressForm] = useState({
    label: 'Home',
    full_name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    phone: '',
    is_default: false
  });

  const speciesOptions = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Hamster', 'Reptile', 'Other'];
  
  const getSpeciesIcon = (species: string) => {
    switch (species.toLowerCase()) {
      case 'dog': return Dog;
      case 'cat': return Cat;
      case 'bird': return Bird;
      case 'fish': return Fish;
      case 'rabbit': 
      case 'hamster': return Rabbit;
      default: return Heart;
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Evergreen': return Crown;
      case 'Sprout': return Star;
      default: return Leaf;
    }
  };

  const handleAddPet = async () => {
    if (!petForm.name || !petForm.species) return;
    await addPet(petForm);
    setPetForm({ name: '', species: 'Dog', breed: '', age_years: 0, age_months: 0, notes: '' });
    setShowAddPet(false);
  };

  const handleAddAddress = async () => {
    if (!addressForm.full_name || !addressForm.address_line1 || !addressForm.city) return;
    await addAddress(addressForm);
    setAddressForm({
      label: 'Home',
      full_name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: '',
      phone: '',
      is_default: false
    });
    setShowAddAddress(false);
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'pets', label: 'My Pets', icon: Heart },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const TierIcon = getTierIcon(profile?.loyalty_tier || 'Seedling');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile?.full_name || 'Pet Parent'}</h2>
                <p className="text-emerald-100">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <TierIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{profile?.loyalty_tier || 'Seedling'} Member</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Points Display */}
          <div className="mt-4 p-4 bg-white/10 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8" />
              <div>
                <p className="text-sm text-emerald-100">Green Paws Points</p>
                <p className="text-3xl font-bold">{profile?.green_paws_points?.toLocaleString() || 0}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white text-emerald-700 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
              Redeem Points
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.id === 'pets' && pets.length > 0 && (
                    <span className="ml-auto bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {pets.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Account Overview</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-emerald-600 mb-2">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">My Pets</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{pets.length}</p>
                    <p className="text-sm text-gray-500">registered pets</p>
                  </div>
                  
                  <div className="bg-amber-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-amber-600 mb-2">
                      <Package className="w-5 h-5" />
                      <span className="font-medium">Orders</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{orders.length}</p>
                    <p className="text-sm text-gray-500">total orders</p>
                  </div>
                  
                  <div className="bg-sky-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sky-600 mb-2">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">Addresses</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-800">{addresses.length}</p>
                    <p className="text-sm text-gray-500">saved addresses</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Quick Actions</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <button 
                      onClick={() => setActiveTab('pets')}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Plus className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="font-medium text-gray-700">Add a Pet Profile</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('addresses')}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-sky-600" />
                        </div>
                        <span className="font-medium text-gray-700">Manage Addresses</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Recent Pets */}
                {pets.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4">Your Pets</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {pets.slice(0, 2).map((pet) => {
                        const PetIcon = getSpeciesIcon(pet.species);
                        return (
                          <div key={pet.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                              <PetIcon className="w-7 h-7 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{pet.name}</p>
                              <p className="text-sm text-gray-500">
                                {pet.breed ? `${pet.breed} • ` : ''}{pet.species}
                                {pet.age_years ? ` • ${pet.age_years}y ${pet.age_months || 0}m` : ''}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pets Tab */}
            {activeTab === 'pets' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">My Pets</h3>
                  <button
                    onClick={() => setShowAddPet(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add Pet
                  </button>
                </div>

                {/* Add Pet Form */}
                {showAddPet && (
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                    <h4 className="font-semibold text-gray-800 mb-4">Add New Pet</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name *</label>
                        <input
                          type="text"
                          value={petForm.name}
                          onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          placeholder="e.g., Max"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
                        <select
                          value={petForm.species}
                          onChange={(e) => setPetForm({ ...petForm, species: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                        >
                          {speciesOptions.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                        <input
                          type="text"
                          value={petForm.breed}
                          onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          placeholder="e.g., Golden Retriever"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Age (Years)</label>
                          <input
                            type="number"
                            min="0"
                            value={petForm.age_years}
                            onChange={(e) => setPetForm({ ...petForm, age_years: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Months</label>
                          <input
                            type="number"
                            min="0"
                            max="11"
                            value={petForm.age_months}
                            onChange={(e) => setPetForm({ ...petForm, age_months: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          value={petForm.notes}
                          onChange={(e) => setPetForm({ ...petForm, notes: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          rows={2}
                          placeholder="Any special dietary needs or preferences..."
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleAddPet}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Save Pet
                      </button>
                      <button
                        onClick={() => setShowAddPet(false)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Pet List */}
                {pets.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No pets yet</h4>
                    <p className="text-gray-500 mb-4">Add your furry friends to get personalized recommendations!</p>
                    <button
                      onClick={() => setShowAddPet(true)}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Add Your First Pet
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {pets.map((pet) => {
                      const PetIcon = getSpeciesIcon(pet.species);
                      return (
                        <div key={pet.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                <PetIcon className="w-8 h-8 text-emerald-600" />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-800">{pet.name}</h4>
                                <p className="text-gray-600">{pet.species}</p>
                                {pet.breed && <p className="text-sm text-gray-500">{pet.breed}</p>}
                                {(pet.age_years || pet.age_months) && (
                                  <p className="text-sm text-emerald-600 font-medium">
                                    {pet.age_years ? `${pet.age_years} year${pet.age_years > 1 ? 's' : ''}` : ''}
                                    {pet.age_years && pet.age_months ? ' ' : ''}
                                    {pet.age_months ? `${pet.age_months} month${pet.age_months > 1 ? 's' : ''}` : ''} old
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => deletePet(pet.id)}
                                className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          {pet.notes && (
                            <p className="mt-3 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                              {pet.notes}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Order History</h3>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h4>
                    <p className="text-gray-500">Your order history will appear here once you make a purchase.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-semibold text-gray-800">Order #{order.order_number}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                              order.status === 'shipped' ? 'bg-sky-100 text-sky-700' :
                              order.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <p className="text-lg font-bold text-gray-800 mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        {order.items && order.items.length > 0 && (
                          <div className="border-t border-gray-100 pt-4">
                            <div className="flex gap-3 overflow-x-auto">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex-shrink-0 w-16">
                                  {item.product_image && (
                                    <img 
                                      src={item.product_image} 
                                      alt={item.product_name}
                                      className="w-16 h-16 object-cover rounded-lg"
                                    />
                                  )}
                                  <p className="text-xs text-gray-500 mt-1 truncate">{item.product_name}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-4 text-sm text-emerald-600">
                          <Leaf className="w-4 h-4" />
                          <span>Earned {order.points_earned} Green Paws Points</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Saved Addresses</h3>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add Address
                  </button>
                </div>

                {/* Add Address Form */}
                {showAddAddress && (
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                    <h4 className="font-semibold text-gray-800 mb-4">Add New Address</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                        <select
                          value={addressForm.label}
                          onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                        >
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={addressForm.full_name}
                          onChange={(e) => setAddressForm({ ...addressForm, full_name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                        <input
                          type="text"
                          value={addressForm.address_line1}
                          onChange={(e) => setAddressForm({ ...addressForm, address_line1: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          placeholder="Street address"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                        <input
                          type="text"
                          value={addressForm.address_line2}
                          onChange={(e) => setAddressForm({ ...addressForm, address_line2: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          placeholder="Apt, suite, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                          <input
                            type="text"
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP *</label>
                          <input
                            type="text"
                            value={addressForm.postal_code}
                            onChange={(e) => setAddressForm({ ...addressForm, postal_code: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={addressForm.is_default}
                            onChange={(e) => setAddressForm({ ...addressForm, is_default: e.target.checked })}
                            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                          />
                          <span className="text-sm text-gray-700">Set as default address</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={handleAddAddress}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddAddress(false)}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Address List */}
                {addresses.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">No addresses saved</h4>
                    <p className="text-gray-500 mb-4">Add an address for faster checkout.</p>
                    <button
                      onClick={() => setShowAddAddress(true)}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Add Your First Address
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="bg-white rounded-xl border border-gray-200 p-5 relative">
                        {address.is_default && (
                          <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{address.label}</p>
                            <p className="text-gray-600">{address.full_name}</p>
                            <p className="text-sm text-gray-500">
                              {address.address_line1}
                              {address.address_line2 && <>, {address.address_line2}</>}
                            </p>
                            <p className="text-sm text-gray-500">
                              {address.city}, {address.state} {address.postal_code}
                            </p>
                            {address.phone && (
                              <p className="text-sm text-gray-500">{address.phone}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                          <button 
                            onClick={() => deleteAddress(address.id)}
                            className="text-sm text-rose-600 hover:text-rose-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800">Account Settings</h3>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Profile Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={profile?.full_name || ''}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        defaultValue={profile?.phone || ''}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-800 mb-4">Email Preferences</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                      <span className="text-gray-700">Order updates and shipping notifications</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                      <span className="text-gray-700">Promotional emails and special offers</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                      <span className="text-gray-700">Pet care tips and blog updates</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                      <span className="text-gray-700">Green Paws Points reminders</span>
                    </label>
                  </div>
                </div>

                <div className="bg-rose-50 rounded-xl border border-rose-200 p-6">
                  <h4 className="font-semibold text-rose-800 mb-2">Danger Zone</h4>
                  <p className="text-sm text-rose-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="px-4 py-2 bg-white border border-rose-300 text-rose-600 rounded-lg font-medium hover:bg-rose-100 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
