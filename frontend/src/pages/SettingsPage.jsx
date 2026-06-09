import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user } = useAuth();
  const [notionKey, setNotionKey] = useState('');
  const [jiraUrl,   setJiraUrl]   = useState('');
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraToken, setJiraToken] = useState('');
  const [saving,    setSaving]    = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      toast.success('Settings saved!');
      setSaving(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
            <p className="text-gray-400 text-sm">Manage your account and integrations.</p>
          </div>

          {/* Profile */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <h2 className="text-white font-semibold mb-4">Profile</h2>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center">
                <span className="text-indigo-400 text-xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-medium">{user?.name}</p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
                <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {user?.plan} plan
                </span>
              </div>
            </div>
          </div>

          {/* Notion Integration */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📝</span>
              <div>
                <h2 className="text-white font-semibold">Notion Integration</h2>
                <p className="text-gray-400 text-xs">Auto-export meeting notes to Notion</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Notion API Key
              </label>
              <input
                type="password"
                value={notionKey}
                onChange={(e) => setNotionKey(e.target.value)}
                placeholder="secret_xxxxxxxxxxxx"
                className="w-full bg-gray-800 border border-gray-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none"
              />
              <p className="text-gray-500 text-xs mt-1">
                Get your key at notion.so/my-integrations
              </p>
            </div>
          </div>

          {/* Jira Integration */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎫</span>
              <div>
                <h2 className="text-white font-semibold">Jira Integration</h2>
                <p className="text-gray-400 text-xs">Auto-create Jira tickets from action items</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Jira URL</label>
                <input
                  type="text"
                  value={jiraUrl}
                  onChange={(e) => setJiraUrl(e.target.value)}
                  placeholder="https://yourcompany.atlassian.net"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Jira Email</label>
                <input
                  type="email"
                  value={jiraEmail}
                  onChange={(e) => setJiraEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Jira API Token</label>
                <input
                  type="password"
                  value={jiraToken}
                  onChange={(e) => setJiraToken(e.target.value)}
                  placeholder="your-api-token"
                  className="w-full bg-gray-800 border border-gray-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Create token at id.atlassian.com/manage-profile/security/api-tokens
                </p>
              </div>
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {saving ? 'Saving...' : 'Save settings'}
          </button>
        </div>
      </main>
    </div>
  );
}