
import { Publication, PublicationType, CitationStyle } from '../types';

// --- Helper Functions ---
function formatAuthorsList(authors: string, style: CitationStyle): string[] {
  return authors.split(/,\s*(?:and|&)\s*|;\s*|,\s+/).map(name => name.trim()).filter(Boolean);
}

function getLastName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts.length > 0 ? parts[parts.length - 1] : fullName;
}

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return '';
  return parts.slice(0, -1).map(namePart => namePart.charAt(0).toUpperCase() + '.').join('');
}


function titleCase(str: string): string {
    // This is a very basic title case, mainly for Chicago headlines.
    // More robust title casing is complex (e.g., handling prepositions, conjunctions).
    return str.toLowerCase().split(' ').map(word => {
        if (word.length > 0 && !['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in', 'of'].includes(word.toLowerCase()) || word === str.toLowerCase().split(' ')[0]) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    }).join(' ');
}


// --- APA 7th Edition Specific Helpers ---
function formatAuthorsAPA7(authors: string): string {
  const authorList = formatAuthorsList(authors, 'APA');
  if (authorList.length === 0) return "";
  if (authorList.length <= 20) {
    if (authorList.length === 1) return authorList[0] + ".";
    const lastAuthor = authorList.pop();
    return authorList.join(', ') + (authorList.length > 0 ? ', & ' : '& ') + lastAuthor + ".";
  } else {
    return authorList.slice(0, 19).join(', ') + ', ..., ' + authorList[authorList.length - 1] + ".";
  }
}

// --- Chicago (Notes & Bibliography - 17th ed.) Specific Helpers ---
function formatAuthorsChicago(authors: string): string {
  const authorList = formatAuthorsList(authors, 'Chicago');
  if (authorList.length === 0) return "";
  if (authorList.length === 1) return authorList[0] + ".";
  if (authorList.length <= 10) {
    const lastAuthor = authorList.pop();
    return authorList.join(', ') + (authorList.length > 0 ? ', and ' : 'and ') + lastAuthor + ".";
  } else {
    // For more than 10 authors, list the first seven followed by "et al."
    return authorList.slice(0, 7).join(', ') + ", et al.";
  }
}

// --- Harvard Specific Helpers ---
function formatAuthorsHarvard(authors: string): string {
  const authorList = formatAuthorsList(authors, 'Harvard');
  return authorList.map(author => {
      const lastName = getLastName(author);
      const initials = getInitials(author);
      return `${lastName}, ${initials}`;
  }).join(authorList.length > 2 ? ', ' : ' and ').replace(/,$/, '');
}

// --- Vancouver Specific Helpers ---
function formatAuthorsVancouver(authors: string): string {
  const authorList = formatAuthorsList(authors, 'Vancouver');
  if (authorList.length <= 6) {
    return authorList.map(author => {
      const lastName = getLastName(author);
      const initials = getInitials(author).replace(/\./g, '');
      return `${lastName} ${initials}`;
    }).join(', ');
  } else {
    return authorList.slice(0, 6).map(author => {
      const lastName = getLastName(author);
      const initials = getInitials(author).replace(/\./g, '');
      return `${lastName} ${initials}`;
    }).join(', ') + ', et al.';
  }
}

// --- MLA (9th ed.) Specific Helpers ---
function formatAuthorsMLA(authors: string): string {
  const authorList = formatAuthorsList(authors, 'MLA');
  if (authorList.length === 0) return "";
  if (authorList.length === 1) return authorList[0] + ".";
  if (authorList.length === 2) return `${authorList[0]}, and ${authorList[1]}.`;
  return `${authorList[0]}, et al.`; // For three or more authors
}


export function getJournalParts(details?: string): { volume?: string, issue?: string, pages?: string, fullDetails?: string } {
  if (!details) return { fullDetails: '' };
  let cleanDetails = details.replace(/\[[^\]]+\]/g, '').trim().replace(/[.,\s]+$/, '');

  const volIssuePagesMatch = cleanDetails.match(/^([\w\d-]+)\s*\(([\w\d-]+)\)\s*,\s*([\w\d-]+(?:–|-)[\w\d-]+|[a-zA-Z0-9]+)$/);
  if (volIssuePagesMatch) {
    return { volume: volIssuePagesMatch[1], issue: volIssuePagesMatch[2], pages: volIssuePagesMatch[3], fullDetails: cleanDetails };
  }
  const volPagesMatch = cleanDetails.match(/^([\w\d-]+)\s*,\s*([\w\d-]+(?:–|-)[\w\d-]+|[a-zA-Z0-9]+)$/);
  if (volPagesMatch) {
    return { volume: volPagesMatch[1], pages: volPagesMatch[2], fullDetails: cleanDetails };
  }
  const volIssueOnlyMatch = cleanDetails.match(/^([\w\d-]+)\s*\(([\w\d-]+)\)$/);
  if (volIssueOnlyMatch) {
    return { volume: volIssueOnlyMatch[1], issue: volIssueOnlyMatch[2], fullDetails: cleanDetails };
  }
  if (/^([\w\d-]+(?:–|-)[\w\d-]+|[a-zA-Z0-9]+)$/.test(cleanDetails)) {
    return { pages: cleanDetails, fullDetails: cleanDetails };
  }
  return { fullDetails: cleanDetails };
}

export function generateAPA(publication: Publication): string {
  const authors = formatAuthorsAPA7(publication.authors);
  const yearString = publication.year.toString();
  const year = yearString.includes('Expected') || yearString.includes('Communicated') ? 
               yearString.replace(/\(([^)]+)\)/, '$1').split(' ')[0] : 
               yearString;

  let titleSegment = publication.title.endsWith('.') || publication.title.endsWith('?') ? publication.title : `${publication.title}.`;
  let sourceSegment = '';
  let detailsSegment = '';

  switch (publication.type) {
    case PublicationType.Journal:
      const { volume, issue, pages } = getJournalParts(publication.details);
      sourceSegment = `*${publication.source}*`; 
      if (volume) sourceSegment += `, *${volume}*`; 
      if (issue) sourceSegment += `(${issue})`;
      if (pages) sourceSegment += `, ${pages}`;
      sourceSegment = sourceSegment.trimRight();
      if (!sourceSegment.endsWith('.')) sourceSegment += '.';
      break;
    case PublicationType.BookChapter:
      let bookTitleString = publication.source;
      const inMatch = publication.source.match(/^(?:In\s+)?(?:Chapter \d+\s+in\s+)?(.*?)(?:\s+\(pp\. .*?\))?\.$/i);
      bookTitleString = `*${(inMatch && inMatch[1]) ? inMatch[1].trim() : publication.source.replace(/^(?:In\s+)?(?:Chapter \d+\s+in\s+)?/i, '').replace(/\.$/, '').trim()}*`;
      sourceSegment = `In ${bookTitleString}`;
      if (publication.details) {
          const pageMatch = publication.details.match(/pp\.\s*([\d\w-]+)/);
          if (pageMatch) sourceSegment += ` (pp. ${pageMatch[1]})`;
          const publisherMatch = publication.details.match(/^([^\[(.,]+)/); 
          if (publisherMatch && publisherMatch[1].trim().length > 1 && !publisherMatch[1].toLowerCase().includes('isbn')) { 
            sourceSegment += `. ${publisherMatch[1].trim()}`;
          }
      }
      if (!sourceSegment.endsWith('.')) sourceSegment += '.';
      break;
    case PublicationType.Conference:
      titleSegment = `*${publication.title.replace(/[.?]$/, '')}*.`; 
      sourceSegment = `[Paper presentation]. ${publication.source.replace(/\.$/, '')}`; 
      if (publication.details) sourceSegment += `, ${publication.details.replace(/\.$/, '').replace('Poster Accepted. Presentation: ', '')}`; 
      sourceSegment += '.';
      break;
    case PublicationType.InProgress:
    case PublicationType.WorkingPaper:
      titleSegment = `*${publication.title.replace(/[.?]$/, '')}*.`;
      if (publication.status) {
          const s = publication.status.toLowerCase();
          if (s.includes('submitted') || s.includes('communicated') || s.includes('under review')) detailsSegment = '[Manuscript submitted for publication]. ';
          else if (s.includes('in press')) detailsSegment = '[Manuscript in press]. ';
          else if (s.includes('preprint')) detailsSegment = '[Preprint]. ';
          else detailsSegment = '[Work in progress]. ';
      } else detailsSegment = '[Work in progress]. ';
      sourceSegment = `${publication.source.replace(/\.$/, '')}.`;
      break;
    default:
      sourceSegment = `${publication.source.replace(/\.$/, '')}.`;
      break;
  }
  let apaString = `${authors} (${year}). ${titleSegment.trim()} ${detailsSegment.trim()}${sourceSegment.trim()}`.trim();
  if (publication.doiLink) apaString += ` ${publication.doiLink}`;
  else if (publication.link && (publication.type === PublicationType.WorkingPaper || publication.type === PublicationType.InProgress)) apaString += ` Retrieved from ${publication.link}`;
  
  apaString = apaString.replace(/\s\s+/g, ' ').replace(/\.\.$/, '.').replace(/\s\./g, '.');
  if (!apaString.endsWith('.') && !publication.doiLink && !publication.link && !apaString.endsWith('?') && !apaString.endsWith('!')) apaString += '.';
  return apaString.trim();
}

export function generateChicago(publication: Publication): string {
  const authors = formatAuthorsChicago(publication.authors);
  const year = publication.year.toString().match(/^\d{4}/)?.[0] || publication.year.toString();

  let citation = `${authors} "${publication.title}." `;
  switch (publication.type) {
    case PublicationType.Journal:
      const { volume, issue, pages } = getJournalParts(publication.details);
      citation += `*${publication.source}* ${volume || ''}`;
      if (issue) citation += `, no. ${issue}`;
      citation += ` (${year})`;
      if (pages) citation += `: ${pages.replace(/–|-/g, '–')}`; // en-dash for page ranges
      citation += ".";
      break;
    case PublicationType.BookChapter:
      const chapterSourceMatch = publication.source.match(/^(?:Chapter \d+\s+in\s+)?(.*?)(?:\.$)?/i);
      const bookTitle = chapterSourceMatch ? chapterSourceMatch[1].trim() : publication.source.trim();
      citation += `In *${bookTitle}*`;
      if (publication.details) {
        const editorMatch = publication.authors.includes("Editors:") ? "" : "edited by " + publication.authors.replace("Editors:","").trim() + ", "; // Placeholder for actual editors
        const pageMatch = publication.details.match(/pp\.\s*([\d\w-]+)/);
        if (pageMatch) citation += `, ${pageMatch[1].replace(/–|-/g, '–')}`;
        const publisherParts = publication.details.split('.').map(s => s.trim()).filter(Boolean);
        const publisher = publisherParts.find(p => !p.toLowerCase().includes('isbn') && !p.toLowerCase().includes('pp.')) || "Publisher";
         citation += `. ${publisher}, ${year}.`; // City: Publisher is complex, simplify for now
      } else {
         citation += `. Publisher, ${year}.`;
      }
      break;
    case PublicationType.Conference:
      citation = `${authors} "${publication.title}." Paper presented at the ${publication.source}, ${publication.details || year}.`;
      break;
    default:
      citation = `${authors} "${publication.title}." ${publication.source}, ${year}.`;
      if (publication.status) citation += ` (${publication.status}).`;
      break;
  }
  if (publication.doiLink) citation += ` ${publication.doiLink}.`;
  else if (publication.link) citation += ` ${publication.link}.`;
  return citation.replace(/\s\s+/g, ' ').trim();
}

export function generateHarvard(publication: Publication): string {
  const authors = formatAuthorsHarvard(publication.authors);
  const year = publication.year.toString().match(/^\d{4}/)?.[0] || publication.year.toString();

  let citation = `${authors} (${year}) '${publication.title}'. `;
  switch (publication.type) {
    case PublicationType.Journal:
      const { volume, issue, pages } = getJournalParts(publication.details);
      citation += `*${publication.source}*, ${volume || ''}`;
      if (issue) citation += `(${issue})`;
      if (pages) citation += `, pp. ${pages.replace(/–|-/g, '-')}`;
      citation += ".";
      break;
    case PublicationType.BookChapter:
      const chapterSourceMatch = publication.source.match(/^(?:Chapter \d+\s+in\s+)?(.*?)(?:\.$)?/i);
      const bookTitle = chapterSourceMatch ? chapterSourceMatch[1].trim() : publication.source.trim();
       // Assuming main authors are chapter authors, and book may have editors (not in current data model)
      citation += `In: *${bookTitle}*. Place of publication: Publisher, pp. Pages.`; // Placeholder for editor, place, publisher, pages
      if(publication.details){
         const pageMatch = publication.details.match(/pp\.\s*([\d\w-]+)/);
         const publisher = publication.details.split('.')[0].trim() || "Publisher"; // Basic extraction
         citation = `${authors} (${year}) '${publication.title}'. In: *${bookTitle}*. ${publisher}, pp. ${pageMatch ? pageMatch[1] : 'N/A'}.`;
      }
      break;
    case PublicationType.Conference:
      citation += `In: *Proceedings of the ${publication.source}*. ${publication.details || 'Location, Date'}.`;
      break;
    default:
      citation += `*${publication.source}*.`;
      if (publication.status) citation += ` (${publication.status}).`;
      break;
  }
  if (publication.doiLink) citation += ` Available at: ${publication.doiLink}`;
  else if (publication.link) citation += ` Available at: ${publication.link}`;
  return citation.replace(/\s\s+/g, ' ').trim();
}

export function generateVancouver(publication: Publication): string {
  const authors = formatAuthorsVancouver(publication.authors);
  const year = publication.year.toString().match(/^\d{4}/)?.[0] || publication.year.toString();

  let citation = `${authors}. ${publication.title}. `;
  switch (publication.type) {
    case PublicationType.Journal:
      const { volume, issue, pages } = getJournalParts(publication.details);
      citation += `${publication.source}. ${year};${volume || ''}`;
      if (issue) citation += `(${issue})`;
      if (pages) citation += `:${pages.replace(/–|-/g, '-')}`;
      citation += ".";
      break;
    case PublicationType.BookChapter:
      const chapterSourceMatch = publication.source.match(/^(?:Chapter \d+\s+in\s+)?(.*?)(?:\.$)?/i);
      const bookTitle = chapterSourceMatch ? chapterSourceMatch[1].trim() : publication.source.trim();
      // Assuming main authors are chapter authors
      citation += `In: Editors. *${bookTitle}*. Place: Publisher; ${year}. p. Pages.`; // Placeholder for editors, place, pages
      if(publication.details){
         const pageMatch = publication.details.match(/pp\.\s*([\d\w-]+)/);
         const publisher = publication.details.split('.')[0].trim() || "Publisher"; // Basic extraction
         citation = `${authors}. ${publication.title}. In: *${bookTitle}*. ${publisher}; ${year}. p. ${pageMatch ? pageMatch[1] : 'N/A'}.`;
      }
      break;
    case PublicationType.Conference:
      citation += `In: Proceedings of the ${publication.source}; ${publication.details || 'Date; Location'}. Place: Publisher; ${year}. p. Pages.`; // Placeholders
      break;
    default:
      citation += `${publication.source}; ${year}.`;
      if (publication.status) citation += ` (${publication.status}).`;
      break;
  }
  if (publication.doiLink) citation += ` DOI: ${publication.doiLink.replace("https://doi.org/", "")}.`;
  else if (publication.link) citation += ` Available from: ${publication.link}.`;
  return citation.replace(/\s\s+/g, ' ').trim();
}

export function generateMLA(publication: Publication): string {
  const authors = formatAuthorsMLA(publication.authors);
  const year = publication.year.toString().match(/^\d{4}/)?.[0] || publication.year.toString();

  let citation = `${authors} "${publication.title}." `;
  switch (publication.type) {
    case PublicationType.Journal:
      const { volume, issue, pages } = getJournalParts(publication.details);
      citation += `*${publication.source}*, vol. ${volume || ''}`;
      if (issue) citation += `, no. ${issue}`;
      citation += `, ${year}`;
      if (pages) citation += `, pp. ${pages.replace(/–|-/g, '-')}`;
      citation += ".";
      break;
    case PublicationType.BookChapter:
      const chapterSourceMatch = publication.source.match(/^(?:Chapter \d+\s+in\s+)?(.*?)(?:\.$)?/i);
      const bookTitle = chapterSourceMatch ? chapterSourceMatch[1].trim() : publication.source.trim();
      // Assuming main authors are chapter authors
      citation += `*${bookTitle}*, edited by Editors, Publisher, ${year}, pp. Pages.`; // Placeholders
       if(publication.details){
         const pageMatch = publication.details.match(/pp\.\s*([\d\w-]+)/);
         const publisher = publication.details.split('.')[0].trim() || "Publisher"; // Basic extraction
         citation = `${authors} "${publication.title}." *${bookTitle}*, ${publisher}, ${year}, pp. ${pageMatch ? pageMatch[1] : 'N/A'}.`;
      }
      break;
    case PublicationType.Conference:
      citation += `*${publication.source}*, ${publication.details || 'Date, Location'}, ${year}.`;
      break;
    default:
      citation += `*${publication.source}*, ${year}.`;
      if (publication.status) citation += ` (${publication.status}).`;
      break;
  }
  if (publication.doiLink) citation += ` *DOI.org*, ${publication.doiLink}.`;
  else if (publication.link) citation += ` *Web*, ${publication.link}.`;
  return citation.replace(/\s\s+/g, ' ').trim();
}


export function generateCitation(publication: Publication, style: CitationStyle): string {
  switch (style) {
    case 'APA':
      return generateAPA(publication);
    case 'Chicago':
      return generateChicago(publication);
    case 'Harvard':
      return generateHarvard(publication);
    case 'Vancouver':
      return generateVancouver(publication);
    case 'MLA':
      return generateMLA(publication);
    default:
      return generateAPA(publication); // Default to APA
  }
}

export function generateBibTeX(publication: Publication): string {
  const authorLastName = formatAuthorsList(publication.authors, 'APA')[0]?.split(' ').pop()?.toLowerCase().replace(/[^a-z0-9]/gi, '') || 'unknown';
  const yearString = publication.year.toString().match(/^\d{4}/)?.[0] || publication.year.toString().split(' ')[0].replace(/\D/g,'');
  const titleWords = publication.title.split(' ');
  const titleShort = (titleWords.length > 1 ? titleWords[0] + titleWords[1] : titleWords[0]).toLowerCase().replace(/[^a-z0-9]/gi, '');
  const bibKey = `${authorLastName}${yearString}${titleShort}`;
  
  let bibtex = '';
  const authorsBib = formatAuthorsList(publication.authors, 'APA').join(' and ');

  const escapeBibValue = (value: string | undefined) => value ? value.replace(/([{}&%$#_])/g, '\\$1') : '';

  switch (publication.type) {
    case PublicationType.Journal:
      const { volume, issue, pages } = getJournalParts(publication.details);
      bibtex = `@article{${bibKey},\n`;
      bibtex += `  author    = {${authorsBib}},\n`;
      bibtex += `  title     = {${escapeBibValue(publication.title)}},\n`;
      bibtex += `  journal   = {${escapeBibValue(publication.source)}},\n`;
      bibtex += `  year      = {${yearString}},\n`;
      if (volume) bibtex += `  volume    = {${escapeBibValue(volume)}},\n`;
      if (issue) bibtex += `  number    = {${escapeBibValue(issue)}},\n`;
      if (pages) bibtex += `  pages     = {${escapeBibValue(pages.replace(/–|-/g, '--'))}},\n`;
      break;
    case PublicationType.BookChapter:
      bibtex = `@incollection{${bibKey},\n`;
      bibtex += `  author    = {${authorsBib}},\n`;
      bibtex += `  title     = {${escapeBibValue(publication.title)}},\n`;
      let bookTitle = publication.source;
      const inMatch = publication.source.match(/^(?:In\s+)?(?:Chapter \d+\s+in\s+)?(.*?)(?:\s+\(pp\. .*?\))?\.$/i);
      bookTitle = (inMatch && inMatch[1]) ? inMatch[1].trim() : publication.source.replace(/^(?:In\s+)?(?:Chapter \d+\s+in\s+)?/i, '').replace(/\.$/, '').trim();
      bibtex += `  booktitle = {${escapeBibValue(bookTitle)}},\n`;
      if (publication.details) {
        const publisherMatch = publication.details.match(/^([^\[(.,]+)/);
        if(publisherMatch && !publisherMatch[1].toLowerCase().includes('isbn') && publisherMatch[1].trim().length > 1) bibtex += `  publisher = {${escapeBibValue(publisherMatch[1].trim())}},\n`;
        const pageMatch = publication.details.match(/pp\.\s*([\d\w-]+)/);
        if (pageMatch) bibtex += `  pages     = {${escapeBibValue(pageMatch[1].replace(/–|-/g, '--'))}},\n`;
      }
      bibtex += `  year      = {${yearString}},\n`;
      break;
    case PublicationType.Conference:
      bibtex = `@inproceedings{${bibKey},\n`;
      bibtex += `  author    = {${authorsBib}},\n`;
      bibtex += `  title     = {${escapeBibValue(publication.title)}},\n`;
      bibtex += `  booktitle = {Proceedings of the ${escapeBibValue(publication.source.replace(/\.$/, ''))}},\n`; 
      bibtex += `  year      = {${yearString}},\n`;
      if (publication.details) {
         const detailsCleaned = publication.details.replace('Poster Accepted. Presentation: ', '');
         const addressMatch = detailsCleaned.match(/,\s*([^,]+,\s*[^,]+)$/); 
         if (addressMatch && addressMatch[1]) bibtex += `  address   = {${escapeBibValue(addressMatch[1].trim())}},\n`;
         else if (detailsCleaned.includes(',')) bibtex += `  note      = {${escapeBibValue(detailsCleaned)}},\n`; 
      }
      break;
    case PublicationType.InProgress:
    case PublicationType.WorkingPaper:
    case PublicationType.Report:
      const bibType = publication.type === PublicationType.Report ? '@techreport' : '@unpublished'; 
      bibtex = `${bibType}{${bibKey},\n`;
      bibtex += `  author    = {${authorsBib}},\n`;
      bibtex += `  title     = {${escapeBibValue(publication.title)}},\n`;
      if (publication.type === PublicationType.Report && publication.source) {
        bibtex += `  institution = {${escapeBibValue(publication.source.replace(/\.$/, ''))}},\n`;
      } else { 
        let noteContent = publication.source ? escapeBibValue(publication.source.replace(/\.$/, '')) : '';
        if (publication.status) noteContent += `${noteContent ? '. ' : ''}Status: ${escapeBibValue(publication.status)}`;
        if(noteContent) bibtex += `  note      = {${noteContent}},\n`;
      }
      bibtex += `  year      = {${yearString}},\n`;
      if (publication.link) bibtex += `  url       = {${escapeBibValue(publication.link)}},\n`;
      break;
    default: 
      bibtex = `@misc{${bibKey},\n`;
      bibtex += `  author    = {${authorsBib}},\n`;
      bibtex += `  title     = {${escapeBibValue(publication.title)}},\n`;
      bibtex += `  year      = {${yearString}},\n`;
      let miscNote = escapeBibValue(publication.source.replace(/\.$/, ''));
      if(publication.details) miscNote += `. ${escapeBibValue(publication.details)}`;
      if(publication.status) miscNote += `. Status: ${escapeBibValue(publication.status)}`;
      bibtex += `  howpublished = {${miscNote}},\n`; // Use howpublished for misc
      if (publication.link) bibtex += `  url       = {${escapeBibValue(publication.link)}},\n`;
      break;
  }

  if (publication.doiLink) {
    bibtex += `  doi       = {${publication.doiLink.replace('https://doi.org/', '')}}\n`;
  }
  bibtex = bibtex.replace(/,\n$/, '\n'); // Remove trailing comma if last line
  bibtex += `}`;
  return bibtex;
}
