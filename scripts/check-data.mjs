import { cases, repositories } from '../data/portfolio-data.js';
import { additionalCases } from '../data/additional-cases.js';
import { captureAudit } from '../data/capture-audit.js';
import { existsSync } from 'node:fs';

const errors = [];
const names = repositories.map((repository) => repository.name);
const duplicateNames = names.filter((name, index) => names.indexOf(name) !== index);
const caseIds = cases.map((project) => project.id);
const duplicateCaseIds = caseIds.filter((id, index) => caseIds.indexOf(id) !== index);
const requiredLegacyCases = [
  'Rifa Gana con Martín', 'VIG Mortgage Bank', 'Fast Sport Timing', 'IberoCams Admin',
  'MTB Team Warriors', 'Hapkido Cojedes', 'SGCC', 'Sistema de Cronometraje RFID',
  'Residencia Santa Cruz', 'Winnbags',
];

if (!cases.length) errors.push('No hay casos de producto.');
if (!repositories.length) errors.push('No hay repositorios.');
if (duplicateCaseIds.length) errors.push(`IDs de casos duplicados: ${[...new Set(duplicateCaseIds)].join(', ')}.`);
if (duplicateNames.length) errors.push(`Repositorios duplicados: ${[...new Set(duplicateNames)].join(', ')}.`);
requiredLegacyCases.forEach((name) => {
  if (!cases.some((project) => project.name === name)) errors.push(`Falta el proyecto heredado ${name}.`);
});

repositories.forEach((repository) => {
  if (!repository.name || !repository.product || !repository.summary || !repository.tech.length) {
    errors.push(`Ficha incompleta: ${repository.name || 'sin nombre'}.`);
  }
  if (repository.visibility === 'private' && repository.url) {
    errors.push(`El repositorio privado ${repository.name} no debe exponer URL.`);
  }
  if (repository.productId && !caseIds.includes(repository.productId)) {
    errors.push(`El repositorio ${repository.name} referencia un caso inexistente: ${repository.productId}.`);
  }
});

for (const project of additionalCases) {
  if (!caseIds.includes(project.id)) errors.push(`Falta el caso local ${project.id}.`);
}
for (const capture of captureAudit.filter((entry) => entry.verdict === 'valid')) {
  const project = cases.find((entry) => entry.id === capture.id);
  if (!project || project.image !== capture.image || project.captureVerifiedAt !== capture.verifiedAt) {
    errors.push(`Captura desactualizada en el catálogo: ${capture.id}.`);
  }
}

cases.forEach((project) => {
  if (!project.name || !project.summary || !project.role || !project.stack.length || !project.status) {
    errors.push(`Caso incompleto: ${project.id}.`);
  }
  if (project.categories.includes('production') && !project.url) {
    errors.push(`El caso en producción ${project.name} no tiene URL.`);
  }
  if (project.image && !existsSync(new URL(`..${project.image}`, import.meta.url))) {
    errors.push(`La imagen de ${project.name} no existe: ${project.image}.`);
  }
});

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Datos válidos: ${cases.length} casos y ${repositories.length} repositorios.`);
}
