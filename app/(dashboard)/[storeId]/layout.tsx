import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { soredId: string }
}) {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.soredId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <div>This will be a NavBar</div>
            {children}
        </>
    )
}