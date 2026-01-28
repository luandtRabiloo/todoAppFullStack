import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../../utils/FetchApi/QueryKey';
import { getAllUsers, getFriendRequests } from '../../../utils/FetchApi/FetchApi';
import { useScreenFocusRefetch } from '../../../utils/modules/AppHook';

export const useGetListNoti = () => {
    const query = useQuery({
        queryKey: [QueryKey.useGetListNoti],
        queryFn: getFriendRequests,
    });
    useScreenFocusRefetch(query.refetch);
    console.log('object', query.data);
    return {
        ...query,
        users: query.data?.users,
    };
};
