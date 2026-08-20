const express = require('express');
const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Sharp Properties API is running'
  });
});

// Projects data
const projects = [
  {
    id: 'project-01',
    title: 'Modern Residential Complex',
    category: 'Construction',
    location: 'Faisalabad, Pakistan',
    overview: 'A comprehensive residential development project featuring modern architectural design and quality construction standards. The project includes multiple residential units with premium finishes.',
    scope: ['Structural construction', 'Interior finishing', 'Landscaping', 'Utility installation'],
    process: ['Site Assessment', 'Foundation Work', 'Structural Build', 'Interior Finishing', 'Final Inspection'],
    status: 'Completed',
    image: 'project-01.jpg'
  },
  {
    id: 'project-02',
    title: 'Commercial Office Renovation',
    category: 'Renovation',
    location: 'Faisalabad, Pakistan',
    overview: 'Complete renovation of a commercial office space, transforming an outdated interior into a modern, functional workspace with improved ergonomics and aesthetics.',
    scope: ['Interior demolition', 'Space redesign', 'New finishes', 'MEP upgrades'],
    process: ['Assessment', 'Design Planning', 'Demolition', 'Construction', 'Completion'],
    status: 'Completed',
    image: 'project-02.jpg'
  },
  {
    id: 'project-03',
    title: 'Mixed-Use Development',
    category: 'Design & Build',
    location: 'Faisalabad, Pakistan',
    overview: 'An integrated design-build project combining commercial and residential spaces in a single development. From concept to completion, the project delivered a cohesive multi-purpose facility.',
    scope: ['Architectural design', 'Structural construction', 'Interior design', 'Project management'],
    process: ['Concept Development', 'Design Finalization', 'Construction', 'Interior Works', 'Handover'],
    status: 'Completed',
    image: 'project-03.jpg'
  },
  {
    id: 'project-04',
    title: 'Industrial Infrastructure',
    category: 'Infrastructure',
    location: 'Faisalabad, Pakistan',
    overview: 'Infrastructure development project for an industrial facility, including road access, utility connections, structural foundations, and safety systems.',
    scope: ['Site preparation', 'Infrastructure development', 'Utility connections', 'Safety systems'],
    process: ['Planning', 'Site Work', 'Construction', 'Integration', 'Completion'],
    status: 'Completed',
    image: 'project-04.jpg'
  }
];

router.get('/projects', (req, res) => {
  const { category } = req.query;
  let filtered = projects;
  if (category && category !== 'All') {
    filtered = projects.filter(p => p.category === category);
  }
  res.json({ success: true, data: filtered });
});

router.get('/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.json({ success: true, data: project });
});

module.exports = router;
