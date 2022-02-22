import React from 'react';
import './App.css';
import Card from './.dizajn-kartice/Card';


function App(){
    return(
        <div className='App'>
            <Card
            title='Card Title'
            imageUrl='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.stamparijapokloni.com%2Fbs%2Fkupi%2Fslike-na-platnu-plaza-i-more-nina088-k-2269&psig=AOvVaw0a3gf_Z4NzR1553VGCCM3-&ust=1645210052024000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJD73Zmzh_YCFQAAAAAdAAAAABAO'
            body='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the when an unknown printer took a galley of type and scrambled it to make a type specimen '
            />
        </div>
    );
}

export default App;