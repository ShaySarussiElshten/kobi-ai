import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import FeedPage from './pages/FeedPage.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import CategoriesPage from './pages/CategoriesPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import PlaygroundPage from './pages/PlaygroundPage.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'
import MyPostsPage from './pages/MyPostsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<FeedPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/my-posts" element={<MyPostsPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
