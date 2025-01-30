import { app } from './app';

const init = async () => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
};

init();