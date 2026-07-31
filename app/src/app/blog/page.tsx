'use client';

import { useEffect, useState } from 'react';

export interface BlogPost {
  id?: number | string;
  title?: string;
  body?: string;
  img?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<{ title: string; body: string; img: string }>({ title: '', body: '', img: '' });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Fetch blog posts
  useEffect(() => {
    fetch(`${API_BASE_URL}/blog/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch blogs');
        return res.json();
      })
      .then((data: any) => {
        // Handle different API response structures
        const posts = Array.isArray(data?.data) ? data.data : data;
        setPosts(posts as BlogPost[]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Create new blog post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/blog/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create blog post');
        return res.json();
      })
      .then((createdPost: BlogPost) => {
        setPosts(prev => [...prev, createdPost]);
        setNewPost({ title: '', body: '', img: '' });
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      });
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (loading) return <div>Loading blogs...</div>;

  return (
    <div>
      <h1>Blog Posts</h1>

      {/* Form to create new post */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', background: '#0D1526', padding: '1rem', borderRadius: '4px' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Title:
            <input
              type="text"
              value={newPost.title}
              onChange={e => setNewPost(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter title"
              style={{ background: '#1E2A45', color: '#E2E8F0', border: '1px solid #4A5568', padding: '0.5rem', width: '100%', marginTop: '0.25rem' }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Body:
            <textarea
              value={newPost.body}
              onChange={e => setNewPost(prev => ({ ...prev, body: e.target.value }))}
              placeholder="Enter body"
              rows="4"
              style={{ background: '#1E2A45', color: '#E2E8F0', border: '1px solid #4A5568', padding: '0.5rem', width: '100%', marginTop: '0.25rem' }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label>
            Image URL:
            <input
              type="text"
              value={newPost.img}
              onChange={e => setNewPost(prev => ({ ...prev, img: e.target.value }))}
              placeholder="Enter image URL"
              style={{ background: '#1E2A45', color: '#E2E8F0', border: '1px solid #4A5568', padding: '0.5rem', width: '100%', marginTop: '0.25rem' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <button type="submit" style={{ color: '#64FFDA', background: 'transparent', border: '1px solid #64FFDA', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
            Create Post
          </button>
        </div>
      </form>

      {/* Display blog posts */}
      {posts.map(post => (
        <div key={post.id || Math.random()} style={{ marginBottom: '1rem' }}>
          <h2 className="display-heading" style={{ color: '#64FFDA', marginBottom: '0.5rem' }}>{post.title || 'No title'}</h2>
          <p style={{ color: '#E2E8F0', marginBottom: '0.5rem' }}>{post.body || 'No content'}</p>
          {post.img && (
            <img
              src={post.img}
              alt={post.title || 'Blog post'}
              style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}