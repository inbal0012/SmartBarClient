import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

function EnjoyYourCocktail(props) {
  console.log(props);
  return (
    <Grid>
      <h1>enjoy your cocktail</h1>
      <PhotoCameraIcon fontSize='large' />
      <p>{props.match.params.id}</p>
      {/* <p>{props}</p> */}
    </Grid>
  );
}

export default EnjoyYourCocktail;
