import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us - EntertainIndia</title>
      </Helmet>

      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-heading font-bold">About EntertainIndia</h1>
        </div>
      </div>

      <div className="container-custom py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6">
            Welcome to EntertainIndia - your ultimate destination for the latest entertainment news from Bollywood, Hollywood, OTT platforms, TV shows, music, and celebrity updates.
          </p>

          <h2>Our Mission</h2>
          <p>
            At EntertainIndia, we are passionate about bringing you the most accurate, timely, and engaging entertainment content. Our mission is to keep you informed and entertained with the latest happenings in the world of cinema, television, music, and digital streaming.
          </p>

          <h2>What We Cover</h2>
          <ul>
            <li><strong>Bollywood:</strong> Latest movie releases, celebrity news, box office updates, and exclusive interviews</li>
            <li><strong>Hollywood:</strong> International cinema news, award shows, and blockbuster updates</li>
            <li><strong>OTT Platforms:</strong> Web series reviews, streaming service updates, and digital content trends</li>
            <li><strong>Television:</strong> TV show updates, TRP ratings, and reality show coverage</li>
            <li><strong>Music:</strong> New releases, artist interviews, and music industry news</li>
            <li><strong>Reviews:</strong> In-depth movie and show reviews from our expert critics</li>
          </ul>

          <h2>Our Team</h2>
          <p>
            Our team consists of dedicated entertainment journalists, critics, and content creators who are passionate about the entertainment industry. We work around the clock to bring you accurate, unbiased, and engaging content.
          </p>

          <h2>Contact Us</h2>
          <p>
            Have a story tip or feedback? We'd love to hear from you! Visit our <a href="/contact" className="text-primary-600 hover:underline">Contact page</a> to get in touch.
          </p>
        </div>
      </div>
    </>
  );
}
