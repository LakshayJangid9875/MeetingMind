import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user } = useAuth();
  const [notionKey,  setNotionKey]  = useState('');
  const [jiraUrl,    setJiraUrl]    = useState('');
  const [jiraEmail,  setJiraEmail]  = useState('');
  const [jiraToken,  setJiraToken]  = useState('');
  const [saving,     setSaving]     = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => { toast.success('Settings saved!'); setSaving(false); }, 800);
  };

  return (
    <div className="min-h-screen bg-surface-950 text-white flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="max-w-2xl mx-auto">

          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
            <p className="text-gray-400 text-sm">Manage your account and integrations.</p>
          </motion.div>

          {/* Profile */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card className="p-6 mb-6">
              <h2 className="text-white font-semibold mb-4 flex items-center gap-2">👤 Profile</h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-500/30 to-purple-600/30 rounded-full flex items-center justify-center border border-brand-500/20 flex-shrink-0">
                  <span className="text-brand-400 text-xl font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{user?.name}</p>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  <Badge variant="brand" className="mt-1 capitalize">{user?.plan} plan</Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Notion */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl">📝</div>
                <div>
                  <h2 className="text-white font-semibold">Notion Integration</h2>
                  <p className="text-gray-400 text-xs">Auto-export meeting notes to Notion pages</p>
                </div>
              </div>
              <Input
                label="Notion API Key"
                type="password"
                value={notionKey}
                onChange={(e) => setNotionKey(e.target.value)}
                placeholder="secret_xxxxxxxxxxxx"
                icon="🔑"
              />
              <p className="text-gray-600 text-xs mt-1.5">Get your key at notion.so/my-integrations</p>
            </Card>
          </motion.div>

          {/* Jira */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="p-6 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-xl">🎫</div>
                <div>
                  <h2 className="text-white font-semibold">Jira Integration</h2>
                  <p className="text-gray-400 text-xs">Auto-create Jira tickets from action items</p>
                </div>
              </div>
              <div className="space-y-4">
                <Input label="Jira URL"       type="text"     value={jiraUrl}   onChange={(e) => setJiraUrl(e.target.value)}   placeholder="https://company.atlassian.net" icon="🌐" />
                <Input label="Jira Email"     type="email"    value={jiraEmail} onChange={(e) => setJiraEmail(e.target.value)} placeholder="you@company.com"               icon="📧" />
                <Input label="Jira API Token" type="password" value={jiraToken} onChange={(e) => setJiraToken(e.target.value)} placeholder="your-api-token"                icon="🔑" />
              </div>
              <p className="text-gray-600 text-xs mt-2">Create token at id.atlassian.com/manage-profile/security/api-tokens</p>
            </Card>
          </motion.div>

          {/* Danger zone */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 mb-6 border-red-500/20">
              <h2 className="text-white font-semibold mb-2 flex items-center gap-2">⚠️ Danger zone</h2>
              <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all data. This cannot be undone.</p>
              <Button variant="danger" size="sm">Delete account</Button>
            </Card>
          </motion.div>

          <Button onClick={handleSave} loading={saving} size="lg" className="w-full">
            Save all settings
          </Button>
        </div>
      </main>
    </div>
  );
}