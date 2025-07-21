
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Phone, Mail, Search, Building2 } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  contact: {
    phone: string;
    email: string;
  };
  totalSupplied: number;
  reliabilityScore: number;
}

const SupplierDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock supplier data
  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Lagos Central Collection Hub',
      location: 'Victoria Island, Lagos',
      rating: 4.8,
      specialties: ['PET', 'HDPE', 'PP'],
      contact: {
        phone: '+234 801 234 5678',
        email: 'contact@lagoscentral.ng'
      },
      totalSupplied: 15200,
      reliabilityScore: 95
    },
    {
      id: '2',
      name: 'Abuja Green Solutions',
      location: 'Wuse 2, Abuja',
      rating: 4.6,
      specialties: ['LDPE', 'PVC', 'PS'],
      contact: {
        phone: '+234 802 345 6789',
        email: 'info@abujagreen.ng'
      },
      totalSupplied: 8900,
      reliabilityScore: 88
    },
    {
      id: '3',
      name: 'Port Harcourt Eco Center',
      location: 'GRA Phase 1, Port Harcourt',
      rating: 4.7,
      specialties: ['PET', 'PP', 'HDPE'],
      contact: {
        phone: '+234 803 456 7890',
        email: 'pheco@ecenter.ng'
      },
      totalSupplied: 12100,
      reliabilityScore: 91
    }
  ];

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Supplier Directory
          </CardTitle>
          <Badge variant="secondary">
            {filteredSuppliers.length} centers
          </Badge>
        </div>
        
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search suppliers by name, location, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {filteredSuppliers.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No suppliers match your search</p>
            </div>
          ) : (
            filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={`/placeholder-${supplier.id}.png`} />
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {supplier.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <MapPin className="w-3 h-3" />
                        {supplier.location}
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(supplier.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          {supplier.rating} ({supplier.reliabilityScore}% reliable)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-semibold text-purple-600">
                      {(supplier.totalSupplied / 1000).toFixed(1)}t
                    </div>
                    <div className="text-sm text-gray-500">total supplied</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">Specialties:</div>
                  <div className="flex flex-wrap gap-2">
                    {supplier.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{supplier.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{supplier.contact.email}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierDirectory;
