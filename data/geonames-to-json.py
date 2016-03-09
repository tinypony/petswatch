#!/usr/bin/python

import sys
import getopt
import json
import codecs

def parse(inputfile, outputfile):
	
	columns = ['geonameid', 'name', 'asciiname', 'alternatenames', 'latitude', 'longitude', \
		'feature_class', 'feature_code', 'country_code', 'cc2', 'admin1_code', 'admin2_code', 'admin3_code', \
		'admin4_code','population', 'elevation', 'dem', 'timezone', 'modification_date']
	result = []
	with codecs.open(inputfile, 'r', 'utf-8') as inp:
		with codecs.open(outputfile, 'w+', encoding="utf-8") as out:
			csv_content = inp.readlines()
			print 'lets do this'
			for line in csv_content:
				city_dict = {}
				city_entry = line.rstrip('\n').split('\t')
				'''
				
				geonameid         : integer id of record in geonames database
				name              : name of geographical point (utf8) varchar(200)
				asciiname         : name of geographical point in plain ascii characters, varchar(200)
				alternatenames    : alternatenames, comma separated, ascii names automatically transliterated, convenience attribute from alternatename table, varchar(10000)
				latitude          : latitude in decimal degrees (wgs84)
				longitude         : longitude in decimal degrees (wgs84)
				feature class     : see http://www.geonames.org/export/codes.html, char(1)
				feature code      : see http://www.geonames.org/export/codes.html, varchar(10)
				country code      : ISO-3166 2-letter country code, 2 characters
				cc2               : alternate country codes, comma separated, ISO-3166 2-letter country code, 200 characters
				admin1 code       : fipscode (subject to change to iso code), see exceptions below, see file admin1Codes.txt for display names of this code; varchar(20)
				admin2 code       : code for the second administrative division, a county in the US, see file admin2Codes.txt; varchar(80) 
				admin3 code       : code for third level administrative division, varchar(20)
				admin4 code       : code for fourth level administrative division, varchar(20)
				population        : bigint (8 byte int) 
				elevation         : in meters, integer
				dem               : digital elevation model, srtm3 or gtopo30, average elevation of 3''x3'' (ca 90mx90m) or 30''x30'' (ca 900mx900m) area in meters, integer. srtm processed by cgiar/ciat.
				timezone          : the timezone id (see file timeZone.txt) varchar(40)
				modification date : date of last modification in yyyy-MM-dd format
				'''
				for idx, col in enumerate(columns):
					val = city_entry[idx]

					if col in ['geonameid', 'elevation', 'population', 'dem'] and len(val) > 0:
						val = int(val) 
					elif col in ['latitude', 'longitude'] and len(val) > 0:
						val = float(val)

					city_dict[col] = val

				result.append(city_dict)

			json.dump(result, out, indent=2, sort_keys=False, ensure_ascii=False)





def main(argv):
   inputfile = ''
   outputfile = ''

   try:
      opts, args = getopt.getopt(argv,"hi:o:",["ifile=","ofile="])
   except getopt.GetoptError:
      print 'geonames-to-json.py -i <inputfile> -o <outputfile>'
      sys.exit(2)
   for opt, arg in opts:
      if opt == '-h':
         print 'geonames-to-json.py -i <inputfile> -o <outputfile>'
         sys.exit()
      elif opt in ("-i", "--ifile"):
         inputfile = arg
      elif opt in ("-o", "--ofile"):
         outputfile = arg
   print 'Input file is "', inputfile
   print 'Output file is "', outputfile
   parse(inputfile,outputfile)


if __name__ == "__main__":
   main(sys.argv[1:])
