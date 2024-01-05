import { authOptions } from '@/app/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = async ({}) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login/?callbackUrl=/verify");
    } 
  return <div className='items-center flex h-screen'>
    {session.user?.name}
  </div>
}

export default page