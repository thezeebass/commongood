import { Router } from 'express';
import authRoutes from './auth';
import usersRoutes from './users';
import projectsRoutes from './projects';
import votesRoutes from './votes';
import agentsRoutes from './agents';
import contractorsRoutes from './contractors';
import adminRoutes from './admin';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/projects', projectsRoutes);
router.use('/votes', votesRoutes);
router.use('/agents', agentsRoutes);
router.use('/contractors', contractorsRoutes);
router.use('/admin', adminRoutes);

export default router;
