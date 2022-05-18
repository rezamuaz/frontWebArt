import Image from "next/image";
import {
    FacebookIcon,
    FacebookShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";
import { useRouter } from "next/router";

const SocialShared = () => {
    const { asPath } = useRouter();
    return (
        <div className="flex h-full w-full flex-row items-center justify-start gap-x-2 text-base">
            <span className="text-center">Share</span>
            <FacebookShareButton
                url={process.env.API + asPath}
                quote={""}
                hashtag={"#hashtag"}
                description={"aiueo"}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <br />
            <TwitterShareButton
                title={"test"}
                url={"https://peing.net/ja/"}
                hashtags={["hashtag1", "hashtag2"]}
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </div>
    );
};

export default SocialShared;
