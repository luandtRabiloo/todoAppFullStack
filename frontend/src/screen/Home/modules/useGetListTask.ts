import { useInfiniteQuery } from '@tanstack/react-query';
import { getTodos } from '../../../utils/FetchApi/FetchApi';
import { QueryKey } from '../../../utils/FetchApi/Querykey';
import { Convert } from '../../../utils/Convert';
import { TTodoItemCardProps } from '../../../element/TaskItem';

export const useGetListTask = (limit = 10, filter: 'today' | 'all' | 'week' | 'month' = 'all') => {
    const query = useInfiniteQuery({
        queryKey: [QueryKey.useGetListTask],
        queryFn: ({ pageParam = 1 }) =>
            getTodos({
                page: pageParam,
                limit,
                filter,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === limit ? allPages.length + 1 : undefined;
        },
    });
    const list = Convert.dataQueryToList(query.data) as TTodoItemCardProps['data'][];
    return {
        ...query,
        list,
    };
};
