import { AuthContext } from '@context/AuthProvider';
import { useContext } from 'react';

const useSession = () => useContext(AuthContext);

export default useSession;
