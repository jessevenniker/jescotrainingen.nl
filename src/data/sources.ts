// Bronnen voor de onderzoekspagina, de voetnoten en de kennisbank.
// Alleen peer-reviewed artikelen of erkende working papers. Controleer bij elke update de DOI.

export type SourceKind = 'peer-reviewed' | 'preprint' | 'praktijk';

export type Source = {
  id: string;
  short: string; // auteurs + jaar, voor in de kantlijn
  citation: string; // volledige verwijzing (APA-achtig)
  url: string;
  /** Hoe sterk het bewijs is: peer-reviewed onderzoek, preprint, of praktijkonderzoek (enquête, werkpaper). */
  kind?: SourceKind;
};

export const kindLabel: Record<SourceKind, { nl: string; en: string }> = {
  'peer-reviewed': { nl: 'peer-reviewed', en: 'peer-reviewed' },
  preprint: { nl: 'preprint', en: 'preprint' },
  praktijk: { nl: 'praktijkonderzoek', en: 'industry research' },
};

export const sources: Record<string, Source> = {
  dietvorst2015: {
    id: 'dietvorst2015',
    short: 'Dietvorst, Simmons & Massey (2015)',
    citation: 'Dietvorst, B. J., Simmons, J. P., & Massey, C. (2015). Algorithm aversion: People erroneously avoid algorithms after seeing them err. Journal of Experimental Psychology: General, 144(1), 114–126.',
    url: 'https://doi.org/10.1037/xge0000033',
    kind: 'peer-reviewed',
  },
  logg2019: {
    id: 'logg2019',
    short: 'Logg, Minson & Moore (2019)',
    citation: 'Logg, J. M., Minson, J. A., & Moore, D. A. (2019). Algorithm appreciation: People prefer algorithmic to human judgment. Organizational Behavior and Human Decision Processes, 151, 90–103.',
    url: 'https://doi.org/10.1016/j.obhdp.2018.12.005',
    kind: 'peer-reviewed',
  },
  parasuraman2010: {
    id: 'parasuraman2010',
    short: 'Parasuraman & Manzey (2010)',
    citation: 'Parasuraman, R., & Manzey, D. H. (2010). Complacency and bias in human use of automation: An attentional integration. Human Factors, 52(3), 381–410.',
    url: 'https://doi.org/10.1177/0018720810376055',
    kind: 'peer-reviewed',
  },
  tarafdar2007: {
    id: 'tarafdar2007',
    short: 'Tarafdar, Tu, Ragu-Nathan & Ragu-Nathan (2007)',
    citation: 'Tarafdar, M., Tu, Q., Ragu-Nathan, B. S., & Ragu-Nathan, T. S. (2007). The impact of technostress on role stress and productivity. Journal of Management Information Systems, 24(1), 301–328.',
    url: 'https://doi.org/10.2753/MIS0742-1222240109',
    kind: 'peer-reviewed',
  },
  dellacqua2023: {
    id: 'dellacqua2023',
    short: "Dell'Acqua e.a. (2023)",
    citation: "Dell'Acqua, F., McFowland, E., Mollick, E. R., Lifshitz-Assaf, H., Kellogg, K., Rajendran, S., Krayer, L., Candelon, F., & Lakhani, K. R. (2023). Navigating the jagged technological frontier: Field experimental evidence of the effects of AI on knowledge worker productivity and quality. Harvard Business School Working Paper 24-013.",
    url: 'https://doi.org/10.2139/ssrn.4573321',
    kind: 'preprint',
  },
  noy2023: {
    id: 'noy2023',
    short: 'Noy & Zhang (2023)',
    citation: 'Noy, S., & Zhang, W. (2023). Experimental evidence on the productivity effects of generative artificial intelligence. Science, 381(6654), 187–192.',
    url: 'https://doi.org/10.1126/science.adh2586',
    kind: 'peer-reviewed',
  },
  brynjolfsson2025: {
    id: 'brynjolfsson2025',
    short: 'Brynjolfsson, Li & Raymond (2025)',
    citation: 'Brynjolfsson, E., Li, D., & Raymond, L. R. (2025). Generative AI at work. The Quarterly Journal of Economics, 140(2), 889–942.',
    url: 'https://doi.org/10.1093/qje/qjae044',
    kind: 'peer-reviewed',
  },
  davis1989: {
    id: 'davis1989',
    short: 'Davis (1989)',
    citation: 'Davis, F. D. (1989). Perceived usefulness, perceived ease of use, and user acceptance of information technology. MIS Quarterly, 13(3), 319–340.',
    url: 'https://doi.org/10.2307/249008',
    kind: 'peer-reviewed',
  },
  venkatesh2003: {
    id: 'venkatesh2003',
    short: 'Venkatesh, Morris, Davis & Davis (2003)',
    citation: 'Venkatesh, V., Morris, M. G., Davis, G. B., & Davis, F. D. (2003). User acceptance of information technology: Toward a unified view. MIS Quarterly, 27(3), 425–478.',
    url: 'https://doi.org/10.2307/30036540',
    kind: 'peer-reviewed',
  },
  edmondson1999: {
    id: 'edmondson1999',
    short: 'Edmondson (1999)',
    citation: 'Edmondson, A. (1999). Psychological safety and learning behavior in work teams. Administrative Science Quarterly, 44(2), 350–383.',
    url: 'https://doi.org/10.2307/2666999',
    kind: 'peer-reviewed',
  },
  lee2025: {
    id: 'lee2025',
    short: 'Lee e.a. (2025)',
    citation: 'Lee, H.-P., Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. (2025). The impact of generative AI on critical thinking: Self-reported reductions in cognitive effort and confidence effects from a survey of knowledge workers. Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems.',
    url: 'https://doi.org/10.1145/3706598.3713778',
    kind: 'peer-reviewed',
  },
  gerlich2025: {
    id: 'gerlich2025',
    short: 'Gerlich (2025)',
    citation: 'Gerlich, M. (2025). AI tools in society: Impacts on cognitive offloading and the future of critical thinking. Societies, 15(1), 6.',
    url: 'https://doi.org/10.3390/soc15010006',
    kind: 'peer-reviewed',
  },
  risko2016: {
    id: 'risko2016',
    short: 'Risko & Gilbert (2016)',
    citation: 'Risko, E. F., & Gilbert, S. J. (2016). Cognitive offloading. Trends in Cognitive Sciences, 20(9), 676–688.',
    url: 'https://doi.org/10.1016/j.tics.2016.07.002',
    kind: 'peer-reviewed',
  },
  kosmyna2025: {
    id: 'kosmyna2025',
    short: 'Kosmyna e.a. (2025)',
    citation: 'Kosmyna, N., Hauptmann, E., Yuan, Y. T., Situ, J., Liao, X.-H., Beresnitzky, A. V., Braunstein, I., & Maes, P. (2025). Your brain on ChatGPT: Accumulation of cognitive debt when using an AI assistant for essay writing task. arXiv:2506.08872.',
    url: 'https://arxiv.org/abs/2506.08872',
    kind: 'preprint',
  },
  becker2025: {
    id: 'becker2025',
    short: 'Becker, Rush, Barnes & Rein (2025)',
    citation: 'Becker, J., Rush, N., Barnes, E., & Rein, D. (2025). Measuring the impact of early-2025 AI on experienced open-source developer productivity. arXiv:2507.09089.',
    url: 'https://arxiv.org/abs/2507.09089',
    kind: 'preprint',
  },
  niederhoffer2025: {
    id: 'niederhoffer2025',
    short: 'Niederhoffer e.a. (2025)',
    citation: 'Niederhoffer, K., Kellerman, G. R., Lee, A., Liebscher, A., Rapuano, K., & Hancock, J. T. (2025, 22 september). AI-generated “workslop” is destroying productivity. Harvard Business Review.',
    url: 'https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity',
    kind: 'praktijk',
  },
  bedard2026: {
    id: 'bedard2026',
    short: 'Bedard e.a. (2026)',
    citation: 'Bedard, J., Kropp, M., Hsu, M., Karaman, O. T., Hawes, J., & Kellerman, G. R. (2026, 5 maart). When using AI leads to “brain fry”. Harvard Business Review.',
    url: 'https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry',
    kind: 'praktijk',
  },
  upwork2024: {
    id: 'upwork2024',
    short: 'Upwork Research Institute (2024)',
    citation: 'Upwork Research Institute (2024, 23 juli). Upwork study finds employee workloads rising despite increased C-suite investment in artificial intelligence. Persbericht en onderzoek onder 2.500 werkenden en leidinggevenden.',
    url: 'https://investors.upwork.com/news-releases/news-release-details/upwork-study-finds-employee-workloads-rising-despite-increased-c',
    kind: 'praktijk',
  },
  sonnentag2007: {
    id: 'sonnentag2007',
    short: 'Sonnentag & Fritz (2007)',
    citation: 'Sonnentag, S., & Fritz, C. (2007). The Recovery Experience Questionnaire: Development and validation of a measure for assessing recuperation and unwinding from work. Journal of Occupational Health Psychology, 12(3), 204–221.',
    url: 'https://doi.org/10.1037/1076-8998.12.3.204',
    kind: 'peer-reviewed',
  },
  wendsche2017: {
    id: 'wendsche2017',
    short: 'Wendsche & Lohmann-Haislah (2017)',
    citation: 'Wendsche, J., & Lohmann-Haislah, A. (2017). A meta-analysis on antecedents and outcomes of detachment from work. Frontiers in Psychology, 7, 2072.',
    url: 'https://doi.org/10.3389/fpsyg.2016.02072',
    kind: 'peer-reviewed',
  },
  masicampo2011: {
    id: 'masicampo2011',
    short: 'Masicampo & Baumeister (2011)',
    citation: 'Masicampo, E. J., & Baumeister, R. F. (2011). Consider it done! Plan making can eliminate the cognitive effects of unfulfilled goals. Journal of Personality and Social Psychology, 101(4), 667–683.',
    url: 'https://doi.org/10.1037/a0024192',
    kind: 'peer-reviewed',
  },
  gollwitzer1999: {
    id: 'gollwitzer1999',
    short: 'Gollwitzer (1999)',
    citation: 'Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. American Psychologist, 54(7), 493–503.',
    url: 'https://doi.org/10.1037/0003-066X.54.7.493',
    kind: 'peer-reviewed',
  },
  venkatesh2012: {
    id: 'venkatesh2012',
    short: 'Venkatesh, Thong & Xu (2012)',
    citation: 'Venkatesh, V., Thong, J. Y. L., & Xu, X. (2012). Consumer acceptance and use of information technology: Extending the unified theory of acceptance and use of technology. MIS Quarterly, 36(1), 157–178.',
    url: 'https://doi.org/10.2307/41410412',
    kind: 'peer-reviewed',
  },
  deci2000: {
    id: 'deci2000',
    short: 'Deci & Ryan (2000)',
    citation: 'Deci, E. L., & Ryan, R. M. (2000). The “what” and “why” of goal pursuits: Human needs and the self-determination of behavior. Psychological Inquiry, 11(4), 227–268.',
    url: 'https://doi.org/10.1207/S15327965PLI1104_01',
    kind: 'peer-reviewed',
  },
};

export function pick(...ids: string[]): Source[] {
  return ids.map((id) => sources[id]);
}
