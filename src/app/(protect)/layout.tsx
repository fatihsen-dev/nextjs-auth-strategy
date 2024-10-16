import Provider from "./Provider";

interface Props {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    return <Provider>{children}</Provider>;
}
