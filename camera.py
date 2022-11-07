import base64
import cv2
from datetime import datetime
import requests
import os

# Assigning our static_back to None
static_back = None

# List when any moving object appear
motion_list = [ None, None ]

# Time of movement

img_counter = 0
# Initializing DataFrame, one column is start
# time and other column is end time
# df = pandas.DataFrame(columns = ["Start", "End"])

# Capturing video
video = cv2.VideoCapture(1)

# Infinite while loop to treat stack of image as video
while True:
	# Reading frame(image) from video
	check, frame = video.read()

	# Initializing motion = 0(no motion)
	motion = 0

	# Converting color image to gray_scale image
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

	# Converting gray scale image to GaussianBlur
	# so that change can be find easily
	gray = cv2.GaussianBlur(gray, (21, 21), 0)

	# In first iteration we assign the value
	# of static_back to our first frame
	if static_back is None:
		static_back = gray
		continue

	# Difference between static background
	# and current frame(which is GaussianBlur)
	diff_frame = cv2.absdiff(static_back, gray)

	# If change in between static background and
	# current frame is greater than 100 it will show white color(255)
	thresh_frame = cv2.threshold(diff_frame, 100, 255, cv2.THRESH_BINARY)[1]
	thresh_frame = cv2.dilate(thresh_frame, None, iterations = 2)

	# Finding contour of moving object
	cnts,_ = cv2.findContours(thresh_frame.copy(),
					cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

	for contour in cnts:
		if cv2.contourArea(contour) < 10000:
			continue
		motion = 1

		(x, y, w, h) = cv2.boundingRect(contour)
		# making green rectangle around the moving object
		cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 255), 4)

	# Appending status of motion
	motion_list.append(motion)

	motion_list = motion_list[-2:]

	if motion_list[-1] == 0 and motion_list[-2] == 1:
		print("Motion detected: ", datetime.now())
		cv2.putText(frame, f'Datetime: {datetime.now().strftime("%m/%d/%Y, %H:%M:%S")}', (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

		# Capture Image Frame
		encoded = cv2.imencode('.jpg', frame)[1]
		image_data = base64.b64encode(encoded)
		image_decoded = image_data.decode('utf-8')

		with open('readme.txt', 'w') as file:
			file.write(str(image_decoded))

		img_name = f'img_{datetime.now().strftime("%m%d%Y-%H%M%S")}.png'
		cv2.imwrite(os.path.join('./img_captured', img_name), frame)

		url = 'http://localhost:4000/camera'
		myobj = {"datetime" : str(datetime.now()),
				 "image" : str(image_decoded)}

		r = requests.post(url, data=myobj)
		print(r.text)
  
		img_counter += 1

	# Displaying image in gray_scale
	cv2.imshow("Gray Frame", gray)

	# Displaying the difference in currentframe to
	# the staticframe(very first_frame)
	cv2.imshow("Difference Frame", diff_frame)

	# Displaying the black and white image in which if
	# intensity difference greater than 30 it will appear white
	cv2.imshow("Threshold Frame", thresh_frame)

	# Displaying color frame with contour of motion of object
	cv2.imshow("Color Frame", frame)

	key = cv2.waitKey(1)
	if key == ord('q'):
		break

video.release()
cv2.destroyAllWindows()