import React from 'react';
import { useState, useEffect } from 'react';

function Avatar() {
  const [avatarItems, setAvatarItems] = useState({
    seed: '',
    skinColor: '',
    hair: '',
    hairColor: '',
    eyebrows: '',
    eyes: '',
    mouth: '',
    features: '',
    glasses: '',
    earrings: '',
  });


  const updateAvatar = async () => {

  }
  const avatarOptions = {
    seed: [ 'Felix', 'Aneka', ],
    skinColor: [ '9e5622', '763900', 'ecad80', 'f2d3b1', ],
    hair: [ 'long01', 'long02', 'long03', 'long04', 'long05', 'long06', 'long07', 'long08', 'long09', 'long10', 'long11', 'long12', 'long13', 'long14', 'long15', 'long16', 'long17', 'long18', 'long19', 'long20', 'long21', 'long22', 'long23', 'long24', 'long25', 'long26',
            'short01', 'short02', 'short03', 'short04', 'short05', 'short06', 'short07', 'short08', 'short09', 'short10', 'short11', 'short12', 'short13', 'short14', 'short15', 'short16', 'short17', 'short18', 'short19', ],
    hairColor: [ '0e0e0e', '3eac2c', '6a4e35', '85c2c6', '796a45', '562306', '592454', 'ab2a18', 'ac6511', 'afafaf', 'b9a05f', 'cb6820', 'dba3be', 'e5d7a3', ],
    eyebrows: [ 'variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', ],
    eyes: [ 'variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', 'variant16', 'variant17', 'variant18', 'variant19', 'variant20', 'variant21', 'variant22', 'variant23', 'variant24', 'variant25', 'variant26', ],
    mouth: [ 'variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', 'variant16', 'variant17', 'variant18', 'variant19', 'variant20', 'variant21', 'variant22', 'variant23', 'variant24', 'variant25', 'variant26', 'variant27', 'variant28', 'variant29', 'variant30', ],
    features: [ 'birthmark', 'blush', 'freckles', 'mustache', ],
    glasses: [ 'variant01', 'variant02', 'variant03', 'variant04', 'variant05', ],
    earrings: [ 'variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', ],
  }


  return (
      <div>
        Hello!
      </div>
  )



}

export default Avatar;