import { apiCall } from '@utils/apis';

interface Props {
  user: any;
};

const vlog: React.FC<Props> = ({ user }) => {
  const addChannel = async (channelId: string, channelTitle: string) => {
    try {
      const res = await apiCall({
        method: 'post',
        url: '/vlogdev/channel',
        headers: { Authorization: (user as any).signInUserSession.idToken.jwtToken },
        data: {
          channelId,
          channelTitle,
        },
      });
      console.log('add channel => ', res);
    } catch(e) {
      console.error(e);
    }
  };

  const deleteChannel = async (channelId: string, channelTitle: string) => {
    try {
      const res = await apiCall({
        method: 'delete',
        url: '/vlogdev/channel',
        headers: { Authorization: (user as any).signInUserSession.idToken.jwtToken },
        data: {
          channelId,
          channelTitle,
        },
      });
      console.log('delete channel => ', res);
    } catch(e) {
      console.error(e);
    }
  };  
  return (<div></div>);
};

export default vlog;
