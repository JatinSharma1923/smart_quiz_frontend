import { Key, FileText, ActivitySquare } from 'lucide-react';
import AnimatedHeadline from '../../components/Hero/AnimatedHeadline';
import Button from '../../components/common/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [stats, setStats] = useState({ users: 0, quizzes: 0, uptime: '0%', responseTime: '0s' });
  const [apiKeys, setApiKeys] = useState([]);
  const [logs, setLogs] = useState([]);
  const [healthStatus, setHealthStatus] = useState({ cache: 'Unknown', openAI: 'Unknown' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await axios.get('/api/admin/stats');
        setStats(statsResponse.data);

        const apiKeysResponse = await axios.get('/api/admin/api-keys');
        setApiKeys(apiKeysResponse.data);

        const logsResponse = await axios.get('/api/admin/logs');
        setLogs(logsResponse.data);

        const healthResponse = await axios.get('/api/admin/health');
        setHealthStatus(healthResponse.data);
      } catch (error) {
        setErrorMessage('Failed to fetch admin data. Please try again later.');
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark to-brand-darker text-white py-16 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedHeadline />

        {errorMessage && (
          <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>
        )}

        {/* Stats Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">System Stats</h2>
          <div className="bg-brand-darkest/80 p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 border-2 border-white/40">
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.users}</div>
              <div className="text-xs text-gray-400">Users</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.quizzes}</div>
              <div className="text-xs text-gray-400">Quizzes</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.uptime}</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{stats.responseTime}</div>
              <div className="text-xs text-gray-400">Avg. Response</div>
            </div>
          </div>
        </section>

        {/* API Keys Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Key className="h-5 w-5 text-white" /> API Keys
          </h2>
          <div className="bg-brand-darkest/80 p-4 rounded-lg border-2 border-white/40">
            <div className="flex flex-col gap-4">
              {apiKeys.length === 0 ? (
                <div className="text-gray-400">No API keys available.</div>
              ) : (
                apiKeys.map((key, index) => (
                  <div key={index} className="text-gray-400">{key}</div>
                ))
              )}
              <Button
                variant="primary"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                aria-label="Generate new API key"
              >
                Generate New Key
              </Button>
            </div>
          </div>
        </section>

        {/* Logs Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-white" /> Logs
          </h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            {logs.length === 0 ? (
              <div className="text-gray-400">No logs available.</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-gray-400">{log}</div>
              ))
            )}
          </div>
        </section>

        {/* Health & Cache Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ActivitySquare className="h-5 w-5 text-white" /> Health & Cache
          </h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-gray-400">Cache Status: {healthStatus.cache}</div>
            <div className="text-gray-400">OpenAI Status: {healthStatus.openAI}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
