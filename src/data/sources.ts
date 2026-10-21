// Bronnen voor de onderzoekspagina, de voetnoten en de kennisbank.
// Alleen peer-reviewed artikelen of erkende working papers. Controleer bij elke update de DOI.

export type Source = {
  id: string;
  short: string; // auteurs + jaar, voor in de kantlijn
  citation: string; // volledige verwijzing (APA-achtig)
  url: string;
};

export const sources: Record<string, Source> = {
  dietvorst2015: {
    id: 'dietvorst2015',
    short: 'Dietvorst, Simmons & Massey (2015)',
    citation: 'Dietvorst, B. J., Simmons, J. P., & Massey, C. (2015). Algorithm aversion: People erroneously avoid algorithms after seeing them err. Journal of Experimental Psychology: General, 144(1), 114–126.',
    url: 'https://doi.org/10.1037/xge0000033',
  },
  logg2019: {
    id: 'logg2019',
    short: 'Logg, Minson & Moore (2019)',
    citation: 'Logg, J. M., Minson, J. A., & Moore, D. A. (2019). Algorithm appreciation: People prefer algorithmic to human judgment. Organizational Behavior and Human Decision Processes, 151, 90–103.',
    url: 'https://doi.org/10.1016/j.obhdp.2018.12.005',
  },
  parasuraman2010: {
    id: 'parasuraman2010',
    short: 'Parasuraman & Manzey (2010)',
    citation: 'Parasuraman, R., & Manzey, D. H. (2010). Complacency and bias in human use of automation: An attentional integration. Human Factors, 52(3), 381–410.',
    url: 'https://doi.org/10.1177/0018720810376055',
  },
  tarafdar2007: {
    id: 'tarafdar2007',
    short: 'Tarafdar, Tu, Ragu-Nathan & Ragu-Nathan (2007)',
    citation: 'Tarafdar, M., Tu, Q., Ragu-Nathan, B. S., & Ragu-Nathan, T. S. (2007). The impact of technostress on role stress and productivity. Journal of Management Information Systems, 24(1), 301–328.',
    url: 'https://doi.org/10.2753/MIS0742-1222240109',
  },
  dellacqua2023: {
    id: 'dellacqua2023',
    short: "Dell'Acqua e.a. (2023)",
    citation: "Dell'Acqua, F., McFowland, E., Mollick, E. R., Lifshitz-Assaf, H., Kellogg, K., Rajendran, S., Krayer, L., Candelon, F., & Lakhani, K. R. (2023). Navigating the jagged technological frontier: Field experimental evidence of the effects of AI on knowledge worker productivity and quality. Harvard Business School Working Paper 24-013.",
    url: 'https://doi.org/10.2139/ssrn.4573321',
  },
  noy2023: {
    id: 'noy2023',
    short: 'Noy & Zhang (2023)',
    citation: 'Noy, S., & Zhang, W. (2023). Experimental evidence on the productivity effects of generative artificial intelligence. Science, 381(6654), 187–192.',
    url: 'https://doi.org/10.1126/science.adh2586',
  },
  brynjolfsson2025: {
    id: 'brynjolfsson2025',
    short: 'Brynjolfsson, Li & Raymond (2025)',
    citation: 'Brynjolfsson, E., Li, D., & Raymond, L. R. (2025). Generative AI at work. The Quarterly Journal of Economics, 140(2), 889–942.',
    url: 'https://doi.org/10.1093/qje/qjae044',
  },
  davis1989: {
    id: 'davis1989',
    short: 'Davis (1989)',
    citation: 'Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. MIS Quarterly, 13(3), 319–340.',
    url: 'https://doi.org/10.2307/249008',
  },
  venkatesh2003: {
    id: 'venkatesh2003',
    short: 'Venkatesh, Morris, Davis & Davis (2003)',
    citation: 'Venkatesh, V., Morris, M. G., Davis, G. B., & Davis, F. D. (2003). User acceptance of information technology: Toward a unified view. MIS Quarterly, 27(3), 425–478.',
    url: 'https://doi.org/10.2307/30036540',
  },
  edmondson1999: {
    id: 'edmondson1999',
    short: 'Edmondson (1999)',
    citation: 'Edmondson, A. (1999). Psychological safety and learning behavior in work teams. Administrative Science Quarterly, 44(2), 350–383.',
    url: 'https://doi.org/10.2307/2666999',
  },
};

export function pick(...ids: string[]): Source[] {
  return ids.map((id) => sources[id]);
}
