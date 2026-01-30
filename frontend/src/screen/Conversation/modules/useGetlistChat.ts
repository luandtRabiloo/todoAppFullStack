import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../../utils/FetchApi/QueryKey';
import { getAllFriend } from '../../../utils/FetchApi/FetchApi';
import { useScreenFocusRefetch } from '../../../utils/modules/AppHook';

export const useGetLitChat = () => {
    const query = useQuery({
        queryKey: [QueryKey.useGetLitChat],
        queryFn: getAllFriend,
    });
    useScreenFocusRefetch(query.refetch);
    console.log('useGetLitChat', query.data);
    return {
        ...query,
        friends: query.data?.friends,
    };
};
