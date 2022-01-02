import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ViewQuestionResult from "../components/ViewQuestionResult";
import AnswersBox from "../components/AnswersBox";
import AnswersResultBox from "../components/AnswersResultBox";
import { useRouter } from "next/dist/client/router";
import moment from "moment";
import { useEffect, useState } from "react";
// Done form: question-answer-rightAnswer - 14-10-2021

export default function ResultExam() {
	const router = useRouter();
	const [exam, setExam] = useState();
	useEffect(() => {
		setExam(JSON.parse(router.query.examResult));
	}, [router.query.examResult]);
	console.log(exam);

	return (
		<div>
			<Head>
				<title>Result</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<div className="flex-1 flex flex-col ml-40 mr-20 my-10 py-10 px-10 bg-gray-200 bg-opacity-25">
				<div className="">
					<h1 className="text-3xl font-bold text-green-800 ">
						{exam?.exam?.subject}
					</h1>

					<h3
						className="text-yellow-500 text-2xl font-semibold cursor-pointer mt-3"
						onClick={() => router.push("takeExam")}
					>
						{exam?.exam?.name}
					</h3>
					<div className="w-3/5 mt-5">
						<div className="py-0.5 text-lg bg-blue-50">
							<div className="flex py-0.5 text-lg bg-blue-100">
								<h3 className="text-right w-1/3 pr-2 font-bold">Trạng thái</h3>
								<h3 className=" w-2/3 pl-2">Hoàn thành</h3>
							</div>
							<div className="flex py-0.5 text-lg bg-blue-50">
								<h3 className="text-right w-1/3 pr-2 font-bold">Kết thúc</h3>
								<h3 className=" w-2/3 pl-2">
									{moment
										.utc(exam?.submittedAt)
										.local()
										.format("DD/MM/YYYY h:mm:ss a")}
								</h3>
							</div>
							<div className="flex py-0.5 text-lg bg-blue-100">
								<h3 className="text-right w-1/3 pr-2 font-bold">Thời gian</h3>
								<h3 className=" w-2/3 pl-2">5 phút 53 giây</h3>
							</div>
							<div className="flex py-0.5 text-lg bg-blue-50">
								<h3 className="text-right w-1/3 pr-2 font-bold">Số câu đúng</h3>
								<h3 className=" w-2/3 pl-2">
									{exam?.outOf}/{exam?.exam?.questions?.length}
								</h3>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-5 flex-1 w-3/5 ">
					{exam?.options?.map((e, i) => (
						<ViewQuestionResult
							key={i}
							index={i}
							question={e.question}
							correctOption={e.question.correctOption}
							option={e.option}
						/>
					))}
				</div>

				<div className="flex flex-col items-center justify-start fixed top-24 right-20 bg-indigo-600 bg-opacity-20 rounded-lg p-2 m-10 shadow-lg">
					<h1 className="text-3xl text-indigo-500 font-bold mb-3 p-2">
						Kết quả
					</h1>
					<AnswersResultBox />
					<div className="w-full border-t-2 border-indigo-300 flex flex-col items-center">
						<h1 className="text-3xl text-indigo-500 font-bold pt-2">Điểm số</h1>
						<h1 className="text-[50px] text-red-500 font-bold my-3 w-28 h-28  flex justify-center items-center rounded-full border-red-500 border-2">
							{(exam?.outOf / exam?.exam?.questions?.length) * 10}
						</h1>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
