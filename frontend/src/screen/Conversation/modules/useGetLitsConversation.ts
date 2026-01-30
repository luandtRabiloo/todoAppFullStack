import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../../utils/FetchApi/QueryKey';
import { getAllConversation } from '../../../utils/FetchApi/FetchApi';
import { useScreenFocusRefetch } from '../../../utils/modules/AppHook';

export const useGetLitsConversation = () => {
    const query = useQuery({
        queryKey: [QueryKey.useGetLitsConversation],
        queryFn: getAllConversation,
    });
    useScreenFocusRefetch(query.refetch);
    console.log('useGetLitsConversation', query.data);
    return {
        ...query,
        conversations: query.data?.conversations,
    };
};
