import { AnchorButton } from "@gdh/ui-system";
import { GithubIcon2, LinkedIn } from "@gdh/ui-system/icons";
import styles from "./SocialItems.module.scss";

export function SocialItems({
  githubUsername,
  linkedInUrl,
  isNerdbordConnected,
}: {
  githubUsername: string | null;
  linkedInUrl: string | null;
  isNerdbordConnected?: boolean;
}) {
  return (
    <div className={styles.social}>
      <AnchorButton
        href={`https://github.com/${githubUsername}`}
        icon={<GithubIcon2 />}
      >
        Github
      </AnchorButton>
      {linkedInUrl && (
        <AnchorButton href={linkedInUrl} icon={<LinkedIn />}>
          LinkedIn
        </AnchorButton>
      )}

      {githubUsername && isNerdbordConnected && (
        <AnchorButton href={`https://nerdbord.io/p/${githubUsername}`}>
          Portfolio↗︎
        </AnchorButton>
      )}
    </div>
  );
}
