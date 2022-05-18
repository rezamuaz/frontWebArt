import { Button } from "@Components/Atoms";
import Link from "next/link";
import { useRouter } from "next/router";

const QuickEdit = ({ route }) => {
    const router = useRouter();
    const RedirectHandle = () => {
        router.push(`post/${route}`);
    };

    return (
        <div className="fixed top-6 left-0 z-[100] h-fit w-24 overflow-hidden rounded-tr-full rounded-br-full bg-slate-500 text-slate-50">
            <Link href={`post/${route}`} passHref>
                <a>
                    <Button title="Edit Post" className="h-full w-full" />
                </a>
            </Link>
        </div>
    );
};

export default QuickEdit;
