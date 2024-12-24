'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [params.id]);

  const handleDelete = async () => {
    await fetch(`/api/users/${params.id}`, { method: 'DELETE' });
    router.push('/users');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => router.push(`/users/${params.id}/edit`)}>Edit</button>
    </div>
  );
}
