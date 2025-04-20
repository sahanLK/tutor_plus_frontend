'use client';
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {setLoggedOut} from "@/lib/store/authSlice";


export default function LogoutPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        // setLoading(true);
        fetch('http://localhost:8000/users/logout', {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            signal,
        }).then(res => {
            if (!signal.aborted) {
                console.log(res);
                localStorage.removeItem('access_token');
                dispatch(setLoggedOut());
                // setLoading(false);
                router.push('/auth/login');
            }
        }).catch(err => {
            if (err.name != "AbortError") {
                console.error(err);
            }
        });
        return () => controller.abort();
    }, []);

    return (
        // <div>{loading ? 'Logging Out': 'Logout Success'}</div>
        <div>Some</div>
    )
}
