import Layout from '@/pages/components/layout';
import { Mail, Phone, MapPin, Github, Twitter } from 'lucide-react';

const ProfilePage = () => {
  const userProfile = {
    name: "Bakr Waheed",
    email: "sexysoso@hotmail.com",
    phone: "+1 (555) 6898456",
    location: "el3ataba/elgiza",
    bio: "Full-stack developer passionate about creating amazing web experiences., i will brebare my baber as much as i can",
    github: "bekobeko",
    twitter: "@bakbak"
  };

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        <div className="px-8 py-6 -mt-16">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 mb-4">
              {/* Avatar placeholder */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{userProfile.name}</h1>
            <p className="text-gray-600 mb-6">{userProfile.bio}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-3 text-indigo-600" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 mr-3 text-indigo-600" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-indigo-600" />
                <span>{userProfile.location}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Github className="w-5 h-5 mr-3 text-indigo-600" />
                <span>{userProfile.github}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Twitter className="w-5 h-5 mr-3 text-indigo-600" />
                <span>{userProfile.twitter}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;