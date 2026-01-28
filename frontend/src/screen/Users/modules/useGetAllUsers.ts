import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../../../utils/FetchApi/QueryKey';
import { getAllUsers } from '../../../utils/FetchApi/FetchApi';
import { useScreenFocusRefetch } from '../../../utils/modules/AppHook';

export const useGetAllUsers = () => {
    const query = useQuery({
        queryKey: [QueryKey.useGetAllUsers],
        queryFn: getAllUsers,
    });
    useScreenFocusRefetch(query.refetch);
    return {
        ...query,
        users: query.data?.users,
    };
};
