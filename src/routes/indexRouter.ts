import { Router } from 'express';
import { RecordingsController } from '../controllers/recordingsController';

import * as  multer from 'multer';

const router = Router();
const recordingsController = new RecordingsController();
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },

    filename(req, file, cb) {
        const fileNameArr = file.originalname.split('.');
        cb(null, `${Date.now()}.${fileNameArr[fileNameArr.length - 1]}`);
    },
});
const upload = multer({ storage });

router.get('/recordings', recordingsController.getRecordings.bind(recordingsController));
router.post('/record', upload.single('audio'), recordingsController.createTranscription.bind(recordingsController));

export default router;
