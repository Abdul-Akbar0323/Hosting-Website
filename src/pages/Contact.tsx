import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill in all required fields', 'error');
      return;
    }
    addToast('Message sent successfully! We will get back to you soon.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <div className="section-padding py-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-nova-900">Get in Touch</h1>
          <p className="text-nova-500 mt-2">We would love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-nova-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-nova-700" />
              </div>
              <div>
                <h3 className="font-medium text-nova-900">Email</h3>
                <p className="text-sm text-nova-600 mt-1">hello@novae.com</p>
                <p className="text-sm text-nova-600">support@novae.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-nova-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-nova-700" />
              </div>
              <div>
                <h3 className="font-medium text-nova-900">Phone</h3>
                <p className="text-sm text-nova-600 mt-1">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-nova-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-nova-700" />
              </div>
              <div>
                <h3 className="font-medium text-nova-900">Address</h3>
                <p className="text-sm text-nova-600 mt-1">123 Design District<br/>New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-nova-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-nova-700" />
              </div>
              <div>
                <h3 className="font-medium text-nova-900">Hours</h3>
                <p className="text-sm text-nova-600 mt-1">Mon - Fri: 9am - 6pm<br/>Sat: 10am - 4pm</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-nova-700 mb-1">Name *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-nova-700 mb-1">Email *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-nova-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-nova-700 mb-1">Message *</label>
                <textarea 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-nova-300 rounded-lg focus:ring-2 focus:ring-nova-900 focus:border-transparent outline-none resize-none"
                />
              </div>
              <button type="submit" className="btn-primary inline-flex">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
