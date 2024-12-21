import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FiArrowLeft, FiSearch, FiChevronRight } from 'react-icons/fi'

const subjectChapters = {
  physics: [
    { id: "1", title: "Electric Charges and Fields" },
    { id: "2", title: "Electrostatic Potential and Capacitance" },
    { id: "3", title: "Current Electricity" }
  ],
  chemistry: [
    { id: "1", title: "Some Basic Concepts of Chemistry" },
    { id: "2", title: "Structure of Atom" },
    { id: "3", title: "Chemical Bonding and Molecular Structure" }
  ],
  maths: [
    { id: "1", title: "Sets and Functions" },
    { id: "2", title: "Trigonometric Functions" },
    { id: "3", title: "Complex Numbers" }
  ],
  biology: [
    { id: "1", title: "The Living World" },
    { id: "2", title: "Biological Classification" },
    { id: "3", title: "Plant Kingdom" }
  ]
}

export default function ChapterList() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  const { subject } = useParams()

  const chapters = subjectChapters[subject.toLowerCase()] || []
  const filteredChapters = chapters.filter(chapter =>
    chapter.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(`/subject/${subject}`)}
            className="p-2 hover:bg-gray-100 rounded-full mr-2"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold">
            {subject.charAt(0).toUpperCase() + subject.slice(1)} Chapterwise Questions
          </h1>
        </div>

        <div className="relative mb-6 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            placeholder="Search by Chapter" 
            className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <button 
                className="w-full p-4 flex items-center justify-between text-left"
                onClick={() => navigate(`/subject/${subject}/chapters/${chapter.id}`)}
              >
                <span className="text-gray-900 font-medium text-lg">{chapter.title}</span>
                <FiChevronRight className="h-5 w-5 text-orange-500 flex-shrink-0" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
