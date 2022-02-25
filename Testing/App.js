import React from 'react';
import {} from 'react-native';
import Memory from './memory';

function App() {
  return <Memory 
            table={
              [
                [0, 1],
                [2, 0],
                [1, 2]
              ]
            }
            urls={
              [
                "https://www.b92.net/news/pics/2021/11/03/1150282853618282ab96d68129964412_w640.jpg", // Srbija
                "https://www.grasmeregingerbread.co.uk/old/wp-content/uploads/french-flag.jpg",
                "https://media.istockphoto.com/vectors/united-kingdom-flag-realistic-waving-union-jack-vector-id1251660737?k=20&m=1251660737&s=612x612&w=0&h=Hd3fVDhA3KUaefIawI9jcyTFL7M_YZwO6wBxTu8bVxE=" // UK
              ]
            }
        />
}

export default App;
