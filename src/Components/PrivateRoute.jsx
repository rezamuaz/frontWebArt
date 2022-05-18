import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "@Context/AuthContext";
import LoadingScreen from "@Components/Templates/LoadingScreen";

export default function PrivateRoute({ protectedRoutes, children }) {
    const router = useRouter();
    const { authenticated, loading } = useAuthState();
    const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;
    const extend1 = router.pathname.startsWith("/post");
    const extend2 = router.pathname.startsWith("/manage");

    useEffect(() => {
        if (
            !loading &&
            !authenticated &&
            (pathIsProtected || extend1 || extend2)
        ) {
            // Redirect route, you can point this to /login
            router.push("/login");
        }
    }, [loading, authenticated, pathIsProtected, router, extend1]);

    if ((loading || !authenticated) && pathIsProtected) {
        return <LoadingScreen />;
    }

    return children;
}
