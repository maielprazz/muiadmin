import React from 'react';
import { Typography, Button } from '@material-ui/core';

const Home = () => {
  return (
    <div>
      <Typography paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        sequi ut hic voluptatibus quisquam deleniti sapiente libero maiores
        minima eius suscipit saepe enim in dolores, aspernatur sed qui quos. Sed
        reiciendis quam assumenda eos natus necessitatibus, quae deserunt dolore
        nihil, beatae possimus blanditiis quas facere at harum a. Fugit, labore.
      </Typography>
      <Button variant="contained" color="primary">
        Tombol Primary
      </Button>
      <Button variant="contained" color="secondary">
        Tombol Secondary
      </Button>
      <Button variant="contained" color="primary" disabled>
        Tombol Disabled
      </Button>
    </div>
  );
};

export default Home;
