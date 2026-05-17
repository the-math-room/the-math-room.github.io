import { describe, it, expect } from 'vitest';
import { validatePortfolioData } from '../validation.js';

describe('Landing Page Validation Infrastructure', () => {
  
  it('should pass completely valid portfolio structures without throwing', () => {
    const validData = {
      title: 'My Classroom Tools',
      subtitle: 'A collection of projects',
      projects: [
        {
          title: 'Math App',
          description: 'A cool calculator application.',
          url: './math/'
        }
      ]
    };
    expect(() => validatePortfolioData(validData)).not.toThrow();
  });

  it('should catch and throw an explicit error if the input data is null or a non-object', () => {
    expect(() => validatePortfolioData(null)).toThrow('must be an object');
    expect(() => validatePortfolioData('invalid string data')).toThrow('must be an object');
  });

  // Win: Assert on missing configuration text keys
  it('should catch and throw an explicit error if header strings are missing or malformed', () => {
    const missingTitle = {
      subtitle: 'A collection of web projects.',
      projects: []
    };
    expect(() => validatePortfolioData(missingTitle)).toThrow('missing a valid title or subtitle string');
  });

  it('should catch and throw an explicit error if the crucial projects array is missing or malformed', () => {
    const missingProjects = {
      title: 'My Portfolio',
      subtitle: 'No array here'
    };

    const invalidProjectsType = {
      title: 'My Portfolio',
      subtitle: 'Not an array',
      projects: 'this should be an array but it is a string'
    };

    expect(() => validatePortfolioData(missingProjects)).toThrow("missing a valid 'projects' array");
    expect(() => validatePortfolioData(invalidProjectsType)).toThrow("missing a valid 'projects' array");
  });
});