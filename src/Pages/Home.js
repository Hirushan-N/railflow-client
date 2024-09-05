// Pages/Home.js
import React from 'react';
import PageLayout from '../Layouts/PageLayout';
import HeroBanner from '../components/HeroBanner';

const HomePage = () => {

    const backgroundImage = "https://images.pexels.com/photos/4769075/pexels-photo-4769075.jpeg?cs=srgb&dl=pexels-domenicobertazzo-4769075.jpg&fm=jpg";
    const heroText = "you can count on​"; // Replace this with the data you want to pass
    const heroDescription = "Live journey information";
    const heroDescription2 = 'Get clued in about where your train is and when it’ll arrive, in real time, so you can plan your journey better.';


    return (
        <PageLayout>

            <HeroBanner backgroundImage={backgroundImage} heroText={heroText} heroDescription={heroDescription} heroDescription2={heroDescription2} />

        </PageLayout>
    );
}

export default HomePage;
