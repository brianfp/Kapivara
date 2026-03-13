import { Select } from "@/components/common/Select";

interface AuthorizationTabProps {
    auth: any;
    onUpdate: (newAuth: any) => void;
}

const AUTH_TYPES = [
    { value: 'none', label: 'No Auth' },
    { value: 'bearer', label: 'Bearer Token' },
    { value: 'basic', label: 'Basic Auth' },
    { value: 'apikey', label: 'API Key' }
];

export const AuthorizationTab = ({ auth, onUpdate }: AuthorizationTabProps) => {
    const currentType = auth?.auth_type || 'none';
    let authData: any = {};
    if (auth && auth.auth_data) {
        try {
            authData = typeof auth.auth_data === 'string' ? JSON.parse(auth.auth_data) : auth.auth_data;
        } catch (e) {
            authData = {};
        }
    }

    const handleTypeChange = (newType: string) => {
        onUpdate({
            auth_type: newType,
            auth_data: (newType === 'apikey') ? { add_to: 'header' } : {}
        });
    };

    const handleDataChange = (field: string, value: string) => {
        onUpdate({
            ...auth,
            auth_data: {
                ...authData,
                [field]: value
            }
        });
    };

    return (
        <div className="flex flex-col h-full pl-2">
            <div className="mb-6 flex items-center gap-4">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Auth Type</label>
                <Select
                    value={currentType}
                    onChange={handleTypeChange}
                    options={AUTH_TYPES}
                    className="w-48"
                />
            </div>

            <div className="flex-1">
                {currentType === 'none' && (
                    <div className="text-gray-500 text-sm">
                        This request does not use any authorization.
                    </div>
                )}

                {currentType === 'bearer' && (
                    <div className="flex flex-col gap-2 max-w-2xl h-full pb-4">
                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Token</label>
                        <textarea
                            placeholder="Bearer Token"
                            value={authData.token || ''}
                            onChange={(e) => handleDataChange('token', e.target.value)}
                            className="w-full flex-1 p-2 bg-transparent border border-gray-300 dark:border-gray-700 focus:border-[#0E61B1] dark:focus:border-blue-500 rounded text-sm text-gray-700 dark:text-gray-200 focus:outline-none font-mono"
                        />
                    </div>
                )}

                {currentType === 'basic' && (
                    <div className="flex flex-col gap-4 max-w-md">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={authData.username || ''}
                                onChange={(e) => handleDataChange('username', e.target.value)}
                                className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 focus:border-[#0E61B1] dark:focus:border-blue-500 rounded text-sm text-gray-700 dark:text-gray-200 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={authData.password || ''}
                                onChange={(e) => handleDataChange('password', e.target.value)}
                                className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 focus:border-[#0E61B1] dark:focus:border-blue-500 rounded text-sm text-gray-700 dark:text-gray-200 focus:outline-none"
                            />
                        </div>
                    </div>
                )}

                {currentType === 'apikey' && (
                    <div className="flex flex-col gap-4 max-w-md">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Key</label>
                            <input
                                type="text"
                                placeholder="API Key name"
                                value={authData.key || ''}
                                onChange={(e) => handleDataChange('key', e.target.value)}
                                className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 focus:border-[#0E61B1] dark:focus:border-blue-500 rounded text-sm text-gray-700 dark:text-gray-200 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Value</label>
                            <input
                                type="text"
                                placeholder="API Key value"
                                value={authData.value || ''}
                                onChange={(e) => handleDataChange('value', e.target.value)}
                                className="w-full p-2 bg-transparent border border-gray-300 dark:border-gray-700 focus:border-[#0E61B1] dark:focus:border-blue-500 rounded text-sm text-gray-700 dark:text-gray-200 focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Add to</label>
                            <Select
                                value={authData.add_to || 'header'}
                                onChange={(val) => handleDataChange('add_to', val)}
                                options={[
                                    { value: 'header', label: 'Header' },
                                    { value: 'query', label: 'Query Params' }
                                ]}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
