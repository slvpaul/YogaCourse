import useSWR from 'swr';

export function useUser() {
    const { data, mutate } = useSWR('/user');
    const user = data && data.user;
    return [user, { mutate }];

}