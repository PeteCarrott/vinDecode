import helpers from './helper-functions';
import '../style/index.scss';

const decodeBtn = document.querySelector('.decode-btn');

decodeBtn.addEventListener('click', helpers.decode);