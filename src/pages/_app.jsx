import "@styles/globals.css";
import "regenerator-runtime/runtime";
import { GlobalProvider } from "@Context/GlobalProvider";
import { AuthProvider } from "@Context/AuthContext";
import PrivateRoute from "@Components/PrivateRoute";
import { ThemeProvider } from "next-themes";
import { ModalProvider, ModalWrapper } from "@Components/Molecules/Modal";
import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";
import { AnalyticsProvider, useAnalytics } from "use-analytics";

function MyApp({ Component, pageProps }) {
    const protectedRoutes = ["/gallery", "/user/id", "/dashboard"];
    const myPlugin = {
        name: "my-custom-plugin",
        page: ({ payload }) => {
            console.log("page view fired", payload);
        },
        track: ({ payload }) => {
            console.log("track event payload", payload);
        },
    };
    const analytics = Analytics({
        app: "awesome",
        plugins: [
            myPlugin,
            googleAnalytics({
                trackingId: "123-xyz",
            }),
        ],
    });

    return (
        <GlobalProvider>
            <AnalyticsProvider instance={analytics}>
                <ThemeProvider enableSystem={true} attribute="class">
                    <ModalProvider>
                        <AuthProvider>
                            <PrivateRoute protectedRoutes={protectedRoutes}>
                                <Component {...pageProps} />
                                <ModalWrapper />
                            </PrivateRoute>
                        </AuthProvider>
                    </ModalProvider>
                </ThemeProvider>
            </AnalyticsProvider>
        </GlobalProvider>
    );
}

// MyApp.getInitialProps = async (ctx) => {
//     const data = await loadMetadata();

//     return {
//         menuItems: data,
//     };
// };

export default MyApp;
