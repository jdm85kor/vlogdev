import { useState, useCallback } from 'react';
import { apiCall } from '@utils/apis';

interface Props {
  user: any;
};

const Vlog: React.FC<Props> = ({ user }) => {
  const [channelInfo, setChannelInfo] = useState<{
    channelId: string,
    channelTitle: string,
    group: string,
  }>({ channelId: '', channelTitle: '', group: '' });

  const handleChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setChannelInfo(prev => ({
      ...prev,
      [id]: value,
    }));
  }, [channelInfo]);
  const addChannel = useCallback(async () => {
    try {
      const res = await apiCall({
        method: 'post',
        url: '/vlogdev/channel',
        headers: { Authorization: (user as any).signInUserSession.idToken.jwtToken },
        data: channelInfo,
      });
      console.log('add channel => ', res);
    } catch(e) {
      console.error(e);
    }
  }, [channelInfo, user]);

  const deleteChannel = useCallback(async () => {
    try {
      const res = await apiCall({
        method: 'delete',
        url: '/vlogdev/channel',
        headers: { Authorization: (user as any).signInUserSession.idToken.jwtToken },
        data: channelInfo,
      });
      console.log('delete channel => ', res);
    } catch(e) {
      console.error(e);
    }
  }, [channelInfo, user]);
  return (
    <div>
      <form>
        <label>Id</label>
        <input id="channelId" value={channelInfo.channelId} onChange={handleChangeInput} />
        <label>Title</label>
        <input id="channelTitle" value={channelInfo.channelTitle} onChange={handleChangeInput} />
        <label>Group</label>
        <input id="group" value={channelInfo.group} onChange={handleChangeInput} />
        <button type="button" onClick={addChannel}>ADD</button>
      </form>
    </div>
  );
};

export default Vlog;
