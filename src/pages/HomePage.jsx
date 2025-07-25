import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import CreateBlog from '../components/CreateBlogSection';
import Categories from '../components/Categories';
import BlogList from '../components/BlogList';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <CreateBlog />
      <Categories />
      
    </div>
  );
}
