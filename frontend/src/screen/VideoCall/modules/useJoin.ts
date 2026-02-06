import { useMutation } from '@tanstack/react-query';
import { joinCall } from '../../../utils/FetchApi/FetchApi';

export const useJoin = () => {
    return useMutation({
        mutationFn: joinCall,
    });
};
