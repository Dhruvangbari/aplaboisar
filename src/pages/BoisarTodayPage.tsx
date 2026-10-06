import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Send, Radio, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BoisarTodayPage: React.FC = () => {
  const { localPosts, likePost, addPostComment, addNewPost, showToast } = useApp();
  const [newContent, setNewContent] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    addNewPost(newContent);
    setNewContent('');
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const comment = commentInputs[postId] || '';
    if (!comment.trim()) return;
    addPostComment(postId, comment);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 py-8 pb-20">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* Banner */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-600 animate-pulse" />
              <h1 className="text-xl font-black text-slate-900">
                Boisar Today • स्थानिक घडामोडी
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Local community feed, train updates, road status & happenings in Boisar.
            </p>
          </div>
        </div>

        {/* Post Creation Box */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
          <form onSubmit={handlePostSubmit} className="space-y-3">
            <textarea
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="काय घडतंय बोईसरमध्ये? Share a local update, photo or announcement..."
              rows={3}
              className="w-full text-xs sm:text-sm p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white outline-hidden focus:border-red-500 font-medium"
            />
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => alert('Photo upload dialog (Camera / Gallery)')}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Add Photo</span>
              </button>

              <button
                type="submit"
                disabled={!newContent.trim()}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Update</span>
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-5">
          {localPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Post Author */}
              <div className="p-4 sm:p-5 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-2xl object-cover border border-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900">{post.authorName}</span>
                      {post.authorBadge && (
                        <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.2 rounded-full">
                          {post.authorBadge}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{post.timeAgo} • {post.category}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 sm:px-5 pb-3">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Photo if present */}
              {post.image && (
                <div className="w-full h-64 sm:h-80 bg-slate-100 overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Interaction Bar */}
              <div className="px-4 sm:px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <button
                  onClick={() => likePost(post.id)}
                  className={`flex items-center gap-1.5 font-bold transition-colors ${
                    post.isLiked ? 'text-red-600' : 'hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-600' : ''}`} />
                  <span>{post.likes} Likes</span>
                </button>

                <div className="flex items-center gap-1.5 font-semibold text-slate-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount} Comments</span>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast('Post link copied!', 'success');
                  }}
                  className="flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-900"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 space-y-3">
                {post.comments && post.comments.length > 0 && (
                  <div className="space-y-2">
                    {post.comments.map(c => (
                      <div key={c.id} className="text-xs bg-white p-2.5 rounded-xl border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900">{c.author}</span>
                          <span className="text-[10px] text-slate-400">{c.timeAgo}</span>
                        </div>
                        <p className="text-slate-700">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <form
                  onSubmit={e => handleCommentSubmit(post.id, e)}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    placeholder="Write a comment..."
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white outline-hidden focus:border-red-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
